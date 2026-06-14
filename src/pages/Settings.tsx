import type { userData } from "../data/userData";
import { useForm } from "../hooks/useForm";
import { useMessage } from "../hooks/useMessage";

export default function Settings() {
  // Similar to AddApplication, we use the useForm hook here to manage the state of the user profile form. 
  const { formData, handleInputChange } = useForm<userData>({
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex@example.com",
    currentRole: "Frontend Engineer",
    targetRole: "Staff / Principal Engineer",
    linkedin: "linkedin.com/in/alexmorgan",
  });

  const { message, showMessage } = useMessage(); //useMessage is a custom hook to show temporary messages to the user, such as success or error notifications. In this case, we can use it to show a success message when the profile is saved successfully.
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showMessage("Profile saved successfully!"); // Show success message to user
    console.log("Saved profile:", formData);
  };

  return (
    <form
      onSubmit={handleSave}
      className="mx-auto max-w-4xl space-y-8 rounded-2xl bg-white p-8 shadow-sm"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">
          Manage your account and preferences.
        </p>
      </div>
      {message && (
        <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">
          {message}
        </p>
      )}

      {/* Profile Form */}
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">
            First Name
          </label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Last Name
          </label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Current Role
          </label>
          <input
            name="currentRole"
            value={formData.currentRole}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Target Role
          </label>
          <input
            name="targetRole"
            value={formData.targetRole}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            LinkedIn
          </label>
          <input
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end border-t border-slate-200 pt-6">
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
        >
          Save changes
        </button>
      </div>
    </form>
  );
}