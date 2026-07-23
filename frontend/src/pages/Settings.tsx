import { useContext, useEffect } from "react";
import type { userData } from "../data/userData";
import { useForm } from "../hooks/useForm";
import { useMessage } from "../hooks/useMessage";
import { AuthContext } from "../context/AuthContext";
import { updateUserProfile } from "../services/api";

// Shared field styles keep every input visually consistent with the rest of the app.
const fieldClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:focus:border-indigo-400";
const labelClass = "text-sm font-medium text-slate-700 dark:text-slate-300";

export default function Settings() {
  // Similar to AddApplication, we use the useForm hook here to manage the state of the user profile form. 
  const { formData, setFormData, handleInputChange } = useForm<userData>({
    fullName: "",
    email: "",
    currentPosition: "",
    targetPosition: "",
    linkedin: "",
  });

  const { message, showMessage } = useMessage(); //useMessage is a custom hook to show temporary messages to the user, such as success or error notifications. In this case, we can use it to show a success message when the profile is saved successfully.

  // Reuse the user already loaded into AuthContext (fetched once on app mount) instead of re-fetching.
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!auth?.user) return;
    setFormData((prev) => ({
      ...prev,
      fullName: auth.user!.fullName ?? "",
      email: auth.user!.email ?? "",
      currentPosition: auth.user!.currentPosition ?? "",
      targetPosition: auth.user!.targetPosition ?? "",
      linkedin: auth.user!.linkedin ?? "",
    }));
  }, [auth?.user, setFormData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile({
        fullName: formData.fullName.trim(),
        currentPosition: formData.currentPosition,
        targetPosition: formData.targetPosition,
        linkedin: formData.linkedin,
      });
      // Keep the context in sync so the Navbar reflects the new name immediately.
      auth?.setUser(response.user);
      showMessage("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      showMessage("Failed to save profile.", "error");
    }
  };


  return (
    <form
      onSubmit={handleSave}
      className="mx-auto max-w-4xl space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Manage your account and preferences.
        </p>
      </div>

      {message && (
        <p className={`rounded-lg p-3 text-sm ${message.type === "error" ? "bg-red-50 text-red-600 dark:bg-red-900/40 dark:text-red-300" : "bg-green-50 text-green-600 dark:bg-green-900/40 dark:text-green-300"}`}>
          {message.text}
        </p>
      )}

      {/* Profile Form */}
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass}>
            Full Name
          </label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Email
          </label>
          <input
            name="email"
            value={formData.email}
            readOnly
            className="mt-1.5 w-full cursor-not-allowed rounded-lg border border-slate-300 bg-slate-100 px-4 py-2.5 text-slate-500 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
          />
        </div>

        <div>
          <label className={labelClass}>
            Current Role
          </label>
          <input
            name="currentPosition"
            value={formData.currentPosition}
            onChange={handleInputChange}
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Target Role
          </label>
          <input
            name="targetPosition"
            value={formData.targetPosition}
            onChange={handleInputChange}
            className={fieldClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>
            LinkedIn
          </label>
          <input
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            placeholder="https://linkedin.com/in/username"
            className={`${fieldClass} dark:placeholder:text-slate-500`}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end border-t border-slate-200 pt-6 dark:border-slate-700">
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Save changes
        </button>
      </div>
    </form>
  );
}