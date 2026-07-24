# ApplyTrack

A job application tracker I built to stop losing track of where I'd applied, who I'd heard back from, and what was coming up. It's basically the spreadsheet I got tired of maintaining, turned into a proper app.

You can add applications, set each one's status (Applied, Follow-up, Interview, Offer, or Rejected), filter and sort the list, and see your activity on a dashboard. Sign in with email/password or Google.

**Live demo:** https://applytrack-ten.vercel.app

## What it does

**Track applications end to end**
- Add, edit, view, and delete job applications
- Each entry captures company, job title, location, job type (full-time, part-time, remote, contract, freelance, internship), salary, source, status, date applied, follow-up date, interview date, and free-form notes
- Set each application's status: Applied, Follow-up, Interview, Offer, or Rejected

**Find things fast**
- Search by company or job title
- Filter by status and by job type
- Sort by newest, oldest, or company name (A–Z)
- Paginated list so it stays readable as it grows
- A detail view for the full record of any application

**Dashboard at a glance**
- Stat cards for Total Applied (with week-over-week trend), Interviews reached, Offers, Rejections (with rejection rate), and Follow-ups due soon
- A weekly activity bar chart showing applications submitted over the last 6 weeks
- Your 5 most recent applications
- A merged, date-ordered list of upcoming interviews and follow-ups

**Accounts and profile**
- Sign up and log in with email/password, or sign in with Google
- Both login methods link to the same account, so it doesn't matter which you use
- A settings page for your profile (name, current position, target position, LinkedIn)

**Everyday quality of life**
- Responsive layout for mobile and desktop
- Dark mode
- Snappy navigation with client-side caching (data isn't re-fetched on every visit)

## Tech

**Frontend** — React 19, TypeScript, Vite, Tailwind, React Router, TanStack Query, Recharts, Axios

**Backend** — Node.js, Express, PostgreSQL

**Auth** — JWT in HttpOnly cookies, Google OAuth via Passport.js, bcrypt for passwords

**Hosting** — Frontend on Vercel, backend on Render, PostgreSQL on Neon

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

A few things I'm happy with: OAuth and password logins link to the same account, queries are parameterized so no SQL injection, and the API sits behind auth middleware.

Because the frontend and backend are deployed on different domains, the auth cookie is cross-site. In production it's set with `SameSite=None`, `Secure`, and the `Partitioned` attribute. The Google sign-in flow hands the token to the frontend, which exchanges it for the cookie so it's stored under the correct partition and actually sent on later requests.

Still on my list: adding tests.

