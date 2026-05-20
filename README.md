# Admin Dashboard v2

> Light-mode admin dashboard for managing a cleaning-service business. 8 fully functional pages with client-side state, mock auth, and interactive UI.

## Tech Stack

- **Next.js 16** (App Router, static export)
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (icons)
- **Geist** font (Next.js built-in)
- No external UI libraries — pure Tailwind + custom components

## Project Structure

```
app/
├── layout.tsx                    # Root layout — Geist font, metadata
├── globals.css                   # Tailwind imports, slate-50 bg
├── page.tsx                      # Today dashboard (stats, schedule, actions, activity)
├── login/page.tsx                # Mock auth login page
├── schedule/page.tsx             # Weekly calendar + time-slot job list
├── bookings/page.tsx             # Full data table with search, filters, pagination, CSV export
├── people/page.tsx               # Tabbed card grid (Customers / Providers)
├── pipeline/page.tsx             # Kanban board with stage movement
├── messages/page.tsx             # Split-pane chat (conversations + thread)
├── money/page.tsx                # Revenue stats, bar chart, transactions, invoices
├── settings/page.tsx             # Business profile, notifications, team, billing
├── components/
│   ├── ClientLayout.tsx          # Auth guard + shell (sidebar + topbar + main)
│   ├── Sidebar.tsx               # 240px nav with sections (Main, Ops, System)
│   └── TopBar.tsx                # Dynamic breadcrumb, search, New dropdown, notifications
└── hooks/
    └── useOutsideClick.ts        # Close dropdowns/modals on outside click
```

## How to Run

```bash
cd dashboard-final-v2
npm install
npm run dev          # localhost:3013
npm run build        # static export to ./dist
```

## How to Deploy

### Vercel (recommended)
```bash
npx vercel --prod
```

### Any static host
```bash
npm run build
# Upload ./dist folder
```

## Authentication

Mock auth via `localStorage`:
- **Email:** `admin@example.com`
- **Password:** `changeme123`
- Token: `localStorage.getItem("admin_auth") === "true"`
- Unauthenticated users redirect to `/login`
- Authenticated users redirect away from `/login`

**To replace with real auth:**
1. Swap `ClientLayout.tsx` auth check for NextAuth, Clerk, or your JWT/session logic
2. Remove `localStorage` references
3. Add API routes or middleware for protected pages

## Key Patterns

### Adding a New Page
1. Create `app/newpage/page.tsx` with `"use client"`
2. Add nav item in `app/components/Sidebar.tsx` under the right section
3. Add breadcrumb mapping in `app/components/TopBar.tsx`

### Adding a New Nav Section
Edit `Sidebar.tsx`. Sections are arrays: `mainNav`, `opsNav`, `systemNav`. Each item needs:
- `label`, `href`, `icon` (from lucide-react)

### State Management
- **No global state library** — each page uses `useState`
- Shared data lives in the page component and is passed down
- For real backend: replace mock data arrays with `useEffect` + `fetch()` calls

### Dropdowns / Modals
All dropdowns and modals use the `useOutsideClick` hook to close on outside clicks and Escape key. Pattern:
```tsx
const ref = useRef<HTMLDivElement>(null);
const [open, setOpen] = useState(false);
useOutsideClick(ref, () => setOpen(false));
```

### Styling Conventions
- Background: `bg-slate-50` (content area), `bg-white` (cards/sidebar)
- Primary accent: `teal-600` / `teal-700`
- Cards: `rounded-xl border border-gray-100 bg-white shadow-sm`
- Hover: `hover:bg-gray-50` or `hover:shadow-md`
- Text: `gray-900` headings, `gray-600` body, `gray-500` meta

## Page-by-Page Functionality

| Page | Key Interactions |
|------|-----------------|
| **Today** | Stats cards, quick-action links, schedule list, action-needed links, recent activity |
| **Schedule** | Day selector (Mon–Sun), assign cleaner via ⋯ menu (updates state + toast), + New Job adds mock job |
| **Bookings** | Live search + status filter, pagination (5/page), Export CSV download, ⋯ menu → Cancel booking |
| **People** | Customers/Providers tabs, search filter, Add New modal, View customer modal, Assign Job dropdown |
| **Pipeline** | Kanban columns, ← → arrows move cards between stages, + Add Lead, completed cards flash green |
| **Messages** | Search filters conversations, click marks unread as read, reply updates sidebar preview |
| **Money** | Stats computed from transaction data, Send Reminder shows temporary confirmation |
| **Settings** | Controlled form inputs, Save Changes toast, Invite Member modal, 2-step team removal, card update inline form, cancel subscription confirmation |

## Known Limitations

- **All data is mock state** — no backend or database. Refresh resets everything.
- **Auth is client-side only** — `localStorage` can be bypassed. Not secure for production.
- **No API routes** — all logic is in React components.
- **No tests** — no Jest, Playwright, or Storybook yet.
- **Images are unoptimized** due to static export.
- **No real-time** — messages don't sync across sessions.

## Debugging Tips

- **Build errors?** Run `npx tsc --noEmit` to catch TypeScript issues fast.
- **Dropdown not closing?** Make sure `useOutsideClick` is attached to the wrapper ref.
- **Nav not highlighting?** Check `usePathname()` matches the `href` exactly (including trailing slashes).
- **Auth redirect loop?** Check `ClientLayout.tsx` — the `loading` state must be set to `false` before redirects fire.

## Future Goals

See `ROADMAP.md` in this directory.
