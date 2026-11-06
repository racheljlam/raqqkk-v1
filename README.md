# Rachel Joy Lam — portfolio

A freelance portfolio dressed up as a ticket board: the pitch is a user story, services
and projects are tickets on a kanban board, jobs are sprints, and the contact form is a
"Create issue" dialog. Next.js (App Router) + Tailwind CSS, deployed on Vercel.

## Editing content

Every word on the page lives in [`src/data/site.ts`](src/data/site.ts). Change it there
and the page updates; no component edits needed.

- **Contact details**: `site.email` and `site.linkedin`. Empty either one and its link disappears.
- **Board tickets**: the `board.columns` lists. Each ticket has a number, a type
  (`story`, `task`, `bug`, `epic`), a title, and optional text, labels, and story points.
- **Projects**: `photobooth` and `trackr`. Each also has a ticket in `board.columns`;
  keep the two in step (for example, move Trackr's ticket to "Done" when it ships).
- **Experience**: `experience.sprints`, one entry per employer, most recent first.
- **Stack and certifications**: `stack.groups` and `certifications.items`.

Colors are tokens at the top of [`src/app/globals.css`](src/app/globals.css). The dark
values are listed twice (once for "System", once for an explicit "Dark" choice); keep
them in sync.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.
