import type { CookieOptions } from "express";

// In production the frontend (Vercel) and backend (Render) live on different domains, so the
// auth cookie must be cross-site: sameSite "none" + secure. Locally we use lax + insecure.
// Frontend and backend are on different sites, so the auth cookie is "third-party"; Chrome now
// blocks such cookies unless they are partitioned (CHIPS), hence the `partitioned` flag in prod.
const isProduction = process.env.NODE_ENV === "production";

export const cookieOptions: CookieOptions & { partitioned?: boolean } = {
    httpOnly: true, // prevents client-side JavaScript from accessing the cookie
    secure: isProduction, // requires HTTPS in production
    sameSite: isProduction ? "none" : "lax",
    partitioned: isProduction,
    maxAge: 60 * 60 * 1000, // browser delete cookie time
};
