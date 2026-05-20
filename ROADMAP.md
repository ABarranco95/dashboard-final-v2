# Admin Dashboard — Roadmap & Future Goals

## Immediate Next Steps (High Impact, Low Effort)

### 1. Real Authentication
- Replace `localStorage` mock auth with **NextAuth.js** (credentials provider) or **Clerk**
- Add role-based access: Owner, Manager, Cleaner, Receptionist
- Password reset flow, invite-only signup
- Protect routes with middleware (`middleware.ts`) instead of client-side checks

### 2. Backend API + Database
- **Prisma + PostgreSQL** (or Supabase) schema:
  - `Booking`, `Customer`, `Provider`, `Lead`, `Message`, `Invoice`, `ActivityLog`
- **API Routes** under `app/api/`
  - `GET/POST /api/bookings`
  - `GET/POST /api/customers`
  - `GET/POST /api/leads`
  - `GET/POST /api/messages`
  - `GET /api/dashboard/stats` (aggregated for Today page)
- Replace ALL mock data arrays with `useEffect` + `fetch()` or **TanStack Query (React Query)**

### 3. Real-Time Messaging
- **WebSockets** (Socket.io or PartyKit) for the Messages page
- Notifications appear instantly when a customer texts
- Typing indicators, read receipts
- SMS bridge (Twilio) so customers can text a phone number and it appears in the dashboard

### 4. Pipeline Automation
- Auto-move leads based on triggers (quote accepted → Scheduled)
- Email/SMS templates sent at each stage change
- Pipeline analytics: conversion rate per stage, average time in stage

## Medium-Term Features

### 5. Schedule Calendar View
- FullCalendar or similar for month/week/day views
- Drag-and-drop to reschedule jobs
- Color-coded by cleaner or service type
- Conflict detection (double-booking prevention)

### 6. Provider Mobile App / Clock-In
- Cleaners clock in/out via mobile web app or PWA
- GPS check-in verification
- Photo upload for job completion
- Route optimization for day's jobs

### 7. Financial Suite
- Stripe Connect for paying cleaners (split payments)
- Automated invoicing (weekly/monthly batch)
- P&L dashboard, tax reports
- Cleaner payroll calculations (hours × rate + tips)

### 8. Advanced People Management
- Customer detail drawer with full history, notes, tags
- Provider availability calendar (block out days off)
- Provider performance scorecards (on-time %, customer rating, completion rate)
- CRM-style contact timeline (all touchpoints in one view)

## Long-Term Vision

### 9. AI-Powered Features
- **Lead scoring:** Auto-rank leads by likelihood to book based on behavior
- **Smart scheduling:** AI suggests optimal slot based on location + cleaner availability
- **Sentiment analysis:** Auto-flag unhappy customers from message tone
- **Churn prediction:** Highlight at-risk customers before they cancel

### 10. Marketing Automation
- Email/SMS drip campaigns for abandoned bookings
- Review request automation
- Referral program tracking
- Coupon / promo code management

### 11. Multi-Location / Franchise
- Switch between locations in the sidebar
- Location-level permissions and reporting
- Cross-location customer lookup

## Technical Debt & Quality

- [ ] **Testing:** Jest for utilities, React Testing Library for components, Playwright for E2E flows
- [ ] **State Management:** Migrate from scattered `useState` to **Zustand** or **TanStack Query** for server state
- [ ] **Type Safety:** Generate types from Prisma schema, share between frontend and API
- [ ] **Error Handling:** Global error boundary, toast notification system for API errors
- [ ] **Loading States:** Skeleton screens for all data tables
- [ ] **Optimistic UI:** Update UI immediately on actions (move pipeline card, send message), rollback on error
- [ ] **Accessibility:** Full keyboard navigation, ARIA labels, screen-reader testing
- [ ] **Performance:** Virtualize long lists (bookings table), code-split heavy pages
- [ ] **Observability:** Sentry for error tracking, Vercel Analytics for performance

## File Naming Conventions for New Agents

- Pages: `app/[route]/page.tsx` — always `page.tsx` inside the route folder
- Components: `PascalCase.tsx` in `app/components/`
- Hooks: `useCamelCase.ts` in `app/hooks/`
- Types: define inline or in a `types.ts` at page level until shared
- Keep everything co-located — if a component is only used on one page, put it in that page's folder or a local `components/` subfolder
