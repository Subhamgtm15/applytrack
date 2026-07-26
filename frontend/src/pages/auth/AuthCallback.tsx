import { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { establishSession, fetchCurrentUser } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const ran = useRef(false);

  useEffect(() => {
    // React 18 StrictMode mounts effects twice in dev; guard so we exchange the token once.
    if (ran.current) return;
    ran.current = true;

    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get("token");
    // Strip the token from the URL so it isn't left in the address bar or history.
    window.history.replaceState(null, "", window.location.pathname);

    const run = async () => {
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }
      try {
        await establishSession(token);
        const userResponse = await fetchCurrentUser();
        auth?.setUser(userResponse.user);
        navigate("/", { replace: true });
      } catch {
        navigate("/login", { replace: true });
      }
    };

    run();
  }, [auth, navigate]);

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <p className="text-slate-600 dark:text-slate-300">Signing you in…</p>
    </div>
  );
}
