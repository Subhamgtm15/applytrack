import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import { useMessage } from "../../hooks/useMessage";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { registerUser } from "../../services/api";
import type { User } from "../../data/user"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export default function Signup() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { message, showMessage } = useMessage();
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (data: Omit<User, "id">) => registerUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    })

    const { formData, handleInputChange, validate } = useForm({
        fullName: "",
        email: "",
        password: "",
    }); // this is the intial state of the form, which is an object with three properties: name, email, and password. The useForm hook will manage the state of this form data.

    function submitForm(e: React.FormEvent) {
        e.preventDefault();

        const missingFields = validate(["fullName", "email", "password"]);

        const newErrors: Record<string, string> = {}

        missingFields.forEach((field) => {
            newErrors[field] = `${field} is required`;
        });

        if (missingFields.length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        try {
            createMutation.mutate(formData);
            showMessage("Signup successful! Please login to continue.");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
        catch (err) {
            console.error("Error registering user:", err);
        }
    }


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Create an account</h1>
            <form className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-sm dark:bg-slate-800 dark:border dark:border-slate-700" onSubmit={submitForm}>
                {message && (
                    <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/40 dark:text-green-300">
                        {message}
                    </p>
                )}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Name
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-400"
                    />
                    <ErrorMessage error={errors.name} />
                </div>
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
                <button type="submit" className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 cursor-pointer">
                    Sign Up
                </button>
                <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                    Already have an account?{" "}
                    <span className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-medium" onClick={() => navigate("/login")}>
                        Login
                    </span>
                </div>

            </form>
        </div>
    );
}