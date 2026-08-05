import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import { useMessage } from "../../hooks/useMessage";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { loginUser } from "../../services/api";
import {fetchCurrentUser} from "../../services/api";
import { useAuthStore } from "../../store/authStore";
import {signInWithGoogle} from "../../services/api";

export default function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { message, showMessage } = useMessage();
  const setUser = useAuthStore((s) => s.setUser);

  const { formData, handleInputChange, validate } = useForm({
    email: "",
    password: "",
  }); // this is the intial state of the form, which is an object with three properties: name, email, and password. The useForm hook will manage the state of this form data.

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();

    const missingFields = validate(["email", "password"]);

    const newErrors: Record<string, string> = {}

    missingFields.forEach((field) => {
      newErrors[field] = `${field} is required`;
    });

    if (missingFields.length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      const response = await loginUser(formData);
      showMessage(response.message, "success");
      const userResponse = await fetchCurrentUser();
      setUser(userResponse.user);
      navigate("/");
    } catch (err: any) {
      showMessage(err.response?.data?.message || "An error occurred", 'error');
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Login</h1>
      <form className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-sm dark:bg-slate-800 dark:border dark:border-slate-700" onSubmit={submitForm}>
        {message && (
          <p className={`mb-4 rounded-lg bg-green-50 p-3 text-sm  ${message?.type === "error" ? "bg-red-50 text-red-600 dark:bg-red-900/40 dark:text-red-300" : "text-green-600 dark:bg-green-900/40 dark:text-green-300"}`}>
            {message?.text}
          </p>
        )}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-400" />
          <ErrorMessage error={errors.email} />

        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
          </label>
          <input type="password" name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-400" />
          <ErrorMessage error={errors.password} />
        </div>
        <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
        <div className="text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{" "}
          <span className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer font-medium" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          <span className="text-xs text-slate-400 dark:text-slate-500">or</span>
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>
        <button
          type="button"
          onClick={signInWithGoogle}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:focus:ring-offset-slate-800"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
            <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
          </svg>
          Sign in with Google
        </button>

      </form>
    </div>
  );
}