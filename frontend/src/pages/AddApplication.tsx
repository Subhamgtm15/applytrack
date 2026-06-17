import { useState } from "react";
import type { Application } from "../data/applications";
import { useForm } from "../hooks/useForm";
import { useMessage } from "../hooks/useMessage";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

//we used object instead of multiple useState hooks to manage the form date in more organized way.
export default function AddApplication() {
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState<Omit<Application, "id"> | null>(null);
  //edit application 
  const { id } = useParams();
  const editMode = Boolean(id);

  useEffect(() => {
    if (!id) return;

    const editApplication = async () => {
      try {
        const response = await fetch(`http://localhost:5000/applications/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch application data");
        }
        const result = await response.json();

        const formatted: Omit<Application, "id"> = {
          company: result.application.company,
          role: result.application.role,
          location: result.application.location,
          jobType: result.application.job_type,
          salary: result.application.salary,
          source: result.application.source,
          status: result.application.status,
          dateApplied: result.application.date_applied.split("T")[0],
          followUpDate: result.application.follow_up_date
            ? result.application.follow_up_date.split("T")[0]
            : "",
          notes: result.application.notes,
        }; 
        const base = formatted;

        setFormData(base);
        setOriginalData(base);
      } catch (error) {
        console.error(error);
        showMessage("Failed to load application data.");
      }
    };

    editApplication();
  }, [id]); // Only runs when 'id' changes


  //useform is a custom hook that we created to manage form state and handle input changes in a reusable way across different forms in the application. 
  const { formData, setFormData, handleInputChange, resetForm, validate } =
    useForm<Omit<Application, "id">>({ 
      company: "",
      role: "",
      location: "",
      jobType: "full-time",
      salary: "",
      source: "",
      status: "applied",
      dateApplied: new Date().toISOString().split("T")[0], //set the date to current date  
      followUpDate: "",
      notes: "",
    });

  const [errors, setErrors] = useState<Record<string, string>>({}); //object with field as string and message as string 

  const { message, showMessage } = useMessage(); //custom hook to show message to user
  
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => { // This type definition indicates that the function will handle form submission events from an HTML form element.
    event.preventDefault();
    // Define which fields are actually required
    const missingFields = validate([
      "company",
      "location",
      "dateApplied",
      "jobType",
    ]);
    const newErrors: Record<string, string> = {};

    missingFields.forEach((field) => {
      newErrors[field] = `${field} is required`; //transformation of field name to error message, for example if company is missing then it will set newErrors["company"] = "company is required"
    });


    if (missingFields.length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    //post the form data 
    let response;
    try {
      if (editMode) {
        response = await fetch(`http://localhost:5000/applications/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      } else {
        response = await fetch("http://localhost:5000/applications",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      }


      if (!response.ok) {
        throw new Error("Failed to save application");
      }

      const savedApplication = await response.json();
      console.log(savedApplication);

      showMessage("Application saved successfully!");
      resetForm();
      setTimeout(() => {
        navigate("/applications")
      }, 200); // Navigate to the applications page after a short delay to allow the user to see the success message. You can adjust the delay time as needed.
    }
    catch (error) {
      console.error(error);

      showMessage("Failed to save application.");
    }
  };
  return (
    <form onSubmit={submitForm} className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          New Application
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Track a job you've applied to or plan to apply for.
        </p>
      </div>
      {message && (
        <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/40 dark:text-green-300">
          {message}
        </p>
      )}

      {/* Job Information */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
          Job Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Company Name *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="e.g. Stripe"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
            />
            <ErrorMessage error={errors.company} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Job Title *
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="e.g. Frontend Engineer"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
            />
            <ErrorMessage error={errors.role} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g. Kathmandu, Nepal"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
            />
            <ErrorMessage error={errors.location} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Job Type *
            </label>
            <select name="jobType" value={formData.jobType}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-400">
              <option value="">Select job type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="remote">Remote</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
            </select>
            <ErrorMessage error={errors.jobType} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Salary Range
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="e.g. $80k - $120k"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
            />

          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Source
            </label>
            <input
              type="text"
              name='source'
              value={formData.source}
              onChange={handleInputChange}
              placeholder="LinkedIn, Referral..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
            />
          </div>
        </div>
      </section>

      {/* Status & Dates */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
          Status & Dates
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Status *
            </label>
            <select name="status" value={formData.status}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-400">
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="follow-up">Follow-up</option>
            </select>
            <ErrorMessage error={errors.status} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Date Applied *
            </label>
            <input
              type="date"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-400"
            />
            <ErrorMessage error={errors.dateApplied} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Follow-up Date
            </label>
            <input
              type="date"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-400"
            />
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Notes
        </h2>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Application Notes
          </label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={5}
            placeholder="Add any notes about this application..."
            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-6 dark:border-slate-700">
        <button
          type="button"
          onClick={() => {
            if (editMode && originalData) {
              if (originalData) setFormData(originalData);
            } else {
              resetForm();
            }
          }}
          className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700/50"
        >
          {editMode ? 'Reset Form' : 'Clear Form'}
        </button>

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          {editMode ? "Update Application" : "Save Application"}
        </button>
      </div>
    </form>
  )
}