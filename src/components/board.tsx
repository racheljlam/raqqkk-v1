"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { board, site, type Ticket, type Tone } from "@/data/site";
import { Grip, Plus } from "./icons";
import { Avatar, IssueKey, LabelRow, Section, TypeIcon } from "./ui";

type Column = { name: string; tone: Tone; tickets: Ticket[] };
type Spot = { col: number; index: number };

/** A ticket being dragged: where the pointer is, and where it would land. */
type Drag = {
  ticket: Ticket;
  x: number;
  y: number;
  /** Pointer offset inside the card, so the card does not jump under the cursor. */
  dx: number;
  dy: number;
  width: number;
  height: number;
  over: Spot | null;
};

const initialColumns: Column[] = board.columns.map(({ name, tone, tickets }) => ({
  name,
  tone,
  tickets,
}));

const order = (columns: Column[]) =>
  columns.map((column) => column.tickets.map((ticket) => ticket.key).join(",")).join("|");

/** How far the pointer must travel before a press becomes a drag, in pixels. */
const DRAG_THRESHOLD = 6;
/** Dragging this close to the top or bottom of the window scrolls the page. */
const SCROLL_EDGE = 90;
const SCROLL_STEP = 14;

/** Which column and position is under this point, ignoring the ticket being dragged. */
function locate(x: number, y: number, draggingKey: number): Spot | null {
  const column = document.elementFromPoint(x, y)?.closest<HTMLElement>("[data-col]");
  if (!column) return null;
  let index = 0;
  for (const card of column.querySelectorAll<HTMLElement>("[data-ticket]")) {
    if (card.dataset.ticket === String(draggingKey)) continue;
    const rect = card.getBoundingClientRect();
    if (y > rect.top + rect.height / 2) index += 1;
  }
  return { col: Number(column.dataset.col), index };
}

function quip(ticket: Ticket, from: Tone, to: Tone) {
  const { quips } = board;
  const line =
    from === to
      ? quips.reorder
      : to === "progress"
        ? from === "todo"
          ? quips.todoToProgress
          : quips.doneToProgress
        : to === "done"
          ? from === "todo"
            ? quips.todoToDone
            : quips.progressToDone
          : from === "done"
            ? quips.doneToTodo
            : quips.progressToTodo;
  return line.replace("{id}", `${site.key}-${ticket.key}`);
}

function CardFace({
  ticket,
  grip,
}: {
  ticket: Ticket;
  /** The drag handle. Left out on the floating copy that follows the pointer. */
  grip?: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-start gap-2">
        <p className="min-w-0 flex-1 text-sm font-medium leading-snug">
          {ticket.href ? (
            <a href={ticket.href} draggable={false} className="hover:text-brand hover:underline">
              {ticket.title}
            </a>
          ) : (
            ticket.title
          )}
        </p>
        {grip}
      </div>
      {ticket.body ? (
        <p className="mt-1.5 text-[13px] leading-relaxed text-soft">{ticket.body}</p>
      ) : null}
      {ticket.labels ? <LabelRow items={ticket.labels} className="mt-2.5" /> : null}
      <div className="mt-3 flex items-center gap-2">
        <TypeIcon type={ticket.type} />
        <IssueKey n={ticket.key} />
        <span className="ml-auto flex items-center gap-2">
          {ticket.points ? (
            <span
              className="grid h-5 min-w-5 place-items-center rounded-full bg-chip px-1.5 text-xs font-medium text-soft"
              title="Story points"
            >
              {ticket.points}
            </span>
          ) : null}
          <Avatar small />
        </span>
      </div>
    </>
  );
}

const cardClass = "rounded-[6px] border border-line bg-card p-3 shadow-card";

/**
 * The kanban board. Tickets can be moved three ways:
 * - mouse: drag a card from anywhere on it;
 * - touch: drag it by the dots (so swiping a card still scrolls the page), or tap the dots;
 * - keyboard: focus the dots and use the arrow keys, or Enter for the next column.
 * Moves are for play only: they are not saved, and Reset puts everything back.
 */
export function Board() {
  const [columns, setColumns] = useState(initialColumns);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [message, setMessage] = useState(board.hint);

  // The press that may become a drag. Kept in a ref because pointer events
  // arrive faster than React re-renders.
  const press = useRef<{
    ticket: Ticket;
    startX: number;
    startY: number;
    dx: number;
    dy: number;
    width: number;
    height: number;
    active: boolean;
    x: number;
    y: number;
    over: Spot | null;
  } | null>(null);
  const columnsRef = useRef(columns);
  const scrollFrame = useRef(0);
  const skipClick = useRef(false);
  const focusAfterMove = useRef<number | null>(null);

  useEffect(() => {
    columnsRef.current = columns;
    // A keyboard or tap move re-creates the card in its new column: put focus back on its handle.
    if (focusAfterMove.current !== null) {
      document.querySelector<HTMLElement>(`[data-grip="${focusAfterMove.current}"]`)?.focus();
      focusAfterMove.current = null;
    }
  }, [columns]);

  const move = useCallback((ticket: Ticket, to: Spot) => {
    const current = columnsRef.current;
    const from = current.findIndex((column) => column.tickets.some((t) => t.key === ticket.key));
    if (from < 0) return;
    const fromIndex = current[from].tickets.findIndex((t) => t.key === ticket.key);
    if (from === to.col && fromIndex === to.index) return;

    const next = current.map((column) => ({
      ...column,
      tickets: column.tickets.filter((t) => t.key !== ticket.key),
    }));
    const target = next[to.col].tickets;
    target.splice(Math.max(0, Math.min(to.index, target.length)), 0, ticket);

    columnsRef.current = next;
    setColumns(next);
    setMessage(quip(ticket, current[from].tone, current[to.col].tone));
  }, []);

  const showDrag = useCallback(() => {
    const p = press.current;
    if (!p) return;
    p.over = locate(p.x, p.y, p.ticket.key);
    setDrag({
      ticket: p.ticket,
      x: p.x,
      y: p.y,
      dx: p.dx,
      dy: p.dy,
      width: p.width,
      height: p.height,
      over: p.over,
    });
  }, []);

  // While a drag is held near the top or bottom edge, keep scrolling the page.
  const autoScroll = useCallback(() => {
    const p = press.current;
    if (!p?.active) return;
    const direction = p.y < SCROLL_EDGE ? -1 : p.y > window.innerHeight - SCROLL_EDGE ? 1 : 0;
    if (direction !== 0) {
      window.scrollBy({ top: direction * SCROLL_STEP, behavior: "instant" });
      showDrag();
    }
    scrollFrame.current = requestAnimationFrame(autoScroll);
  }, [showDrag]);

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      const p = press.current;
      if (!p) return;
      if (!p.active) {
        if (Math.hypot(event.clientX - p.startX, event.clientY - p.startY) < DRAG_THRESHOLD) return;
        p.active = true;
        document.body.style.cursor = "grabbing";
        scrollFrame.current = requestAnimationFrame(autoScroll);
      }
      p.x = event.clientX;
      p.y = event.clientY;
      showDrag();
    },
    [autoScroll, showDrag],
  );

  const endPress = useCallback(
    (drop: boolean) => {
      const p = press.current;
      press.current = null;
      cancelAnimationFrame(scrollFrame.current);
      document.body.style.cursor = "";
      if (!p?.active) return;
      // The click that ends a drag must not follow a link or trigger the handle.
      skipClick.current = true;
      setTimeout(() => {
        skipClick.current = false;
      }, 0);
      setDrag(null);
      if (drop && p.over) move(p.ticket, p.over);
    },
    [move],
  );

  // Listen on the window for the whole life of the board, so a drag keeps
  // working when the pointer leaves the card it started on.
  useEffect(() => {
    const onUp = () => endPress(true);
    const onCancel = () => endPress(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") endPress(false);
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(scrollFrame.current);
    };
  }, [onPointerMove, endPress]);

  function onCardPointerDown(event: ReactPointerEvent<HTMLElement>, ticket: Ticket) {
    if (event.button !== 0) return;
    const onGrip = (event.target as HTMLElement).closest("[data-grip]") !== null;
    // Touch drags start only from the handle, so swiping a card still scrolls the page.
    if (event.pointerType !== "mouse" && !onGrip) return;
    const rect = event.currentTarget.getBoundingClientRect();
    press.current = {
      ticket,
      startX: event.clientX,
      startY: event.clientY,
      dx: event.clientX - rect.left,
      dy: event.clientY - rect.top,
      width: rect.width,
      height: rect.height,
      active: false,
      x: event.clientX,
      y: event.clientY,
      over: null,
    };
  }

  function moveFromHandle(ticket: Ticket, to: Spot) {
    focusAfterMove.current = ticket.key;
    move(ticket, to);
  }

  function onGripKeyDown(event: ReactKeyboardEvent, ticket: Ticket, col: number, index: number) {
    const last = columns[col].tickets.length - 1;
    const target: Spot | null =
      event.key === "ArrowRight" && col < columns.length - 1
        ? { col: col + 1, index: 0 }
        : event.key === "ArrowLeft" && col > 0
          ? { col: col - 1, index: 0 }
          : event.key === "ArrowUp" && index > 0
            ? { col, index: index - 1 }
            : event.key === "ArrowDown" && index < last
              ? { col, index: index + 1 }
              : null;
    if (!target) return;
    event.preventDefault();
    moveFromHandle(ticket, target);
  }

  function onClickCapture(event: ReactMouseEvent) {
    if (!skipClick.current) return;
    event.preventDefault();
    event.stopPropagation();
  }

  function reset() {
    columnsRef.current = initialColumns;
    setColumns(initialColumns);
    setMessage(board.hint);
  }

  const changed = order(columns) !== order(initialColumns);

  return (
    <Section id="board" title={board.title} intro={board.intro}>
      <div className="grid items-start gap-3 lg:grid-cols-3" onClickCapture={onClickCapture}>
        {columns.map((column, col) => {
          const create = board.columns[col].create;
          const isTarget = drag?.over?.col === col;
          const placeholder = drag ? (
            <li
              key="placeholder"
              aria-hidden="true"
              className="rounded-[6px] border-2 border-dashed border-brand/60 bg-selected"
              style={{ height: drag.height }}
            />
          ) : null;
          // The dragged card is hidden, not removed, so its touch events keep arriving.
          const visible = column.tickets.filter((ticket) => ticket.key !== drag?.ticket.key);

          return (
            <div
              key={column.name}
              data-col={col}
              className={`rounded-[8px] bg-sunken p-2 transition-shadow ${
                isTarget ? "ring-2 ring-brand/50" : ""
              }`}
            >
              <h3 className="flex items-center gap-2 px-1.5 pb-2.5 pt-1.5 text-xs font-semibold uppercase tracking-wide text-faint">
                {column.name}
                <span className="font-medium">{column.tickets.length}</span>
                {column.tone === "done" ? (
                  <span aria-hidden="true" className="text-story">
                    ✓
                  </span>
                ) : null}
              </h3>

              <ul className="flex min-h-16 flex-col gap-2">
                {column.tickets.flatMap((ticket) => {
                  const dragging = drag?.ticket.key === ticket.key;
                  const index = visible.indexOf(ticket);
                  return [
                    isTarget && !dragging && drag?.over?.index === index ? placeholder : null,
                    <li key={ticket.key} hidden={dragging}>
                      <div
                        data-ticket={ticket.key}
                        onPointerDown={(event) => onCardPointerDown(event, ticket)}
                        onDragStart={(event) => event.preventDefault()}
                        className={`${cardClass} cursor-grab select-none transition-colors hover:bg-hover`}
                      >
                        <CardFace
                          ticket={ticket}
                          grip={
                            <button
                              type="button"
                              data-grip={ticket.key}
                              aria-label={`Move ${site.key}-${ticket.key}, ${ticket.title}. Arrow keys move it; Enter sends it to the next column.`}
                              title="Drag to move, or click to send to the next column"
                              onClick={() =>
                                moveFromHandle(ticket, { col: (col + 1) % columns.length, index: 0 })
                              }
                              onKeyDown={(event) =>
                                onGripKeyDown(event, ticket, col, column.tickets.indexOf(ticket))
                              }
                              className="-mr-1 -mt-1 grid h-7 w-7 shrink-0 cursor-grab touch-none place-items-center rounded-[4px] text-faint transition-colors hover:bg-chip hover:text-ink"
                            >
                              <Grip className="h-3.5 w-3.5" />
                            </button>
                          }
                        />
                      </div>
                    </li>,
                  ];
                })}
                {isTarget && drag?.over && drag.over.index >= visible.length ? placeholder : null}
              </ul>

              {create ? (
                <a
                  href={create.href}
                  className="mt-2 flex items-center gap-2 rounded-[6px] border border-dashed border-faint/50 px-3 py-3 text-sm text-soft transition-colors hover:border-brand hover:text-brand"
                >
                  <Plus className="h-4 w-4 shrink-0" />
                  <span>
                    <span className="font-medium">{create.label}</span>
                    <span className="block text-[13px] text-faint">{create.text}</span>
                  </span>
                </a>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex min-h-8 flex-wrap items-center gap-x-4 gap-y-2 text-sm text-soft">
        <p role="status" aria-live="polite">
          {message}
        </p>
        {changed ? (
          <button
            type="button"
            onClick={reset}
            className="rounded-[4px] px-2 py-1 font-medium text-brand transition-colors hover:bg-selected"
          >
            {board.reset}
          </button>
        ) : null}
      </div>

      {/* The copy of the card that follows the pointer. */}
      {drag ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[70]"
          style={{
            width: drag.width,
            transform: `translate(${drag.x - drag.dx}px, ${drag.y - drag.dy}px) rotate(2.5deg)`,
          }}
        >
          <div className={`${cardClass} shadow-raised`}>
            <CardFace ticket={drag.ticket} />
          </div>
        </div>
      ) : null}
    </Section>
  );
}
