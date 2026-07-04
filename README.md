# ApplyTrack

A job application tracker I built to stop losing track of where I'd applied, who I'd heard back from, and what was coming up. It's basically the spreadsheet I got tired of maintaining, turned into a proper app.

You can add applications, move them through stages (Applied, Interview, Offer, Rejected, Follow-up), filter and sort the list, and see your activity on a dashboard. Sign in with email/password or Google.

## What it does

- Add, edit, and delete job applications
- Track status: Applied, Interview, Offer, Rejected, Follow-up
- Search, filter, and sort
- Dashboard with stats and a weekly activity chart
- Upcoming interviews and follow-ups at a glance
- Email/password login or Google sign-in
- Works on mobile and desktop, dark mode included

## Tech

**Frontend** — React 19, TypeScript, Vite, Tailwind, React Router, TanStack Query, Recharts, Axios

**Backend** — Node.js, Express, PostgreSQL

**Auth** — JWT in HttpOnly cookies, Google OAuth via Passport.js, bcrypt for passwords

## Running it locally

You'll need Node and a PostgreSQL database.

```bash
# backend
cd backend
npm install
npm run dev

# frontend (new terminal)
cd frontend
npm install
npm run dev
```

Both folders have a `.env` to fill in — DB connection string, JWT secret, and Google OAuth credentials.

## Notes

A few things I'm happy with: OAuth and password logins link to the same account, queries are parameterized so no SQL injection, and the API sits behind auth middleware. Still on my list: deploying it and adding tests.

