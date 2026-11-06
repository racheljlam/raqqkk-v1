import type { ReactNode } from "react";

const INK = "#171512";
const MONO = "var(--font-geist-mono), ui-monospace, monospace";

/** A head-and-shoulders silhouette, origin at the centre of the head. */
function Guest({ x, y, scale = 1, children }: { x: number; y: number; scale?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={INK}>
      <circle r="17" />
      <path d="M-34 70C-34 36-18 23 0 23s34 13 34 47z" />
      {children}
    </g>
  );
}

const catEars = <path d="M-16-7l3-21 11 13zM16-7l-3-21-11 13z" />;
const witchHat = <path d="M-25-10h50l-5-5-11-1L2-45l-11 29-11 1z" />;
const armsUp = <path d="M-31 42l-15-48 8-3 19 40zM31 42l15-48-8-3-19 40z" />;

function Frame({ y, children }: { y: number; children: ReactNode }) {
  return (
    <g transform={`translate(12 ${y})`} clipPath="url(#strip-frame)">
      <rect width="156" height="116" fill="#fff" />
      <rect width="156" height="116" fill="url(#strip-dots)" />
      <circle cx="131" cy="25" r="13" fill="#fff" />
      {children}
    </g>
  );
}

/**
 * An original illustration of the booth's printed output: three dithered
 * snaps, an event header, and the Rawr Mode score. Not a real guest photo.
 */
export function PhotoStrip({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 474"
      className={className}
      role="img"
      aria-label="Illustration of a printed photo strip: three black-and-white snaps with a roar score underneath"
    >
      <defs>
        <pattern id="strip-dots" width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.75" fill={INK} />
        </pattern>
        <clipPath id="strip-frame">
          <rect width="156" height="116" />
        </clipPath>
      </defs>

      <rect width="180" height="474" fill="#fffefb" />

      <text
        x="90"
        y="29"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="13"
        fontWeight="700"
        letterSpacing="2.5"
        fill={INK}
      >
        MONSTER MASH
      </text>

      <Frame y={44}>
        <Guest x={74} y={48}>
          {catEars}
        </Guest>
      </Frame>

      <Frame y={172}>
        <Guest x={50} y={52} scale={0.92}>
          {witchHat}
        </Guest>
        <Guest x={106} y={56} scale={0.92} />
      </Frame>

      <Frame y={300}>
        <Guest x={74} y={54}>
          {armsUp}
        </Guest>
        <text
          x="8"
          y="24"
          fontFamily={MONO}
          fontSize="15"
          fontWeight="700"
          fill={INK}
          stroke="#fff"
          strokeWidth="3"
          paintOrder="stroke"
        >
          RAWR!
        </text>
      </Frame>

      <text
        x="90"
        y="441"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="11.5"
        fontWeight="700"
        letterSpacing="1"
        fill={INK}
      >
        ROAR POWER 97%
      </text>
      <text
        x="90"
        y="458"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="9"
        letterSpacing="3"
        fill={INK}
      >
        LEGENDARY
      </text>
    </svg>
  );
}
