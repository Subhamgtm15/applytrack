import { useState } from "react";
import type { Application } from "../data/applications";
import { useForm } from "../hooks/useForm";
import ErrorMessage from "../components/ErrorMessage";

//we used object instead of multiple useState hooks to manage the form date in more organized way.
export default function AddApplication() {
  //useform is a custom hook that we created to manage form state and handle input changes in a reusable way across different forms in the application. 
  const { formData, handleInputChange, resetForm, validate } =
    useForm<Omit<Application, "id">>({ //omit is used to omit id because id will be generated automatically when the app. is saved, database will handle the id generation
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



  const submitForm = (event: React.FormEvent<HTMLFormElement>) => { // This type definition indicates that the function will handle form submission events from an HTML form element.
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
      newErrors[field] = `${field} is required`;
    });


    if (missingFields.length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    console.log(formData);
    resetForm();
  }
  return (
    <form onSubmit={submitForm} className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          New Application
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Track a job you've applied to or plan to apply for.
        </p>
      </div>

      {/* Job Information */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Job Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Company Name *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="e.g. Stripe"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500"
            />
            <ErrorMessage error={errors.company} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Title *
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="e.g. Frontend Engineer"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500"
            />
            <ErrorMessage error={errors.role} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g. Kathmandu, Nepal"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500"
            />
            <ErrorMessage error={errors.location} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Type *
            </label>
            <select name="jobType" value={formData.jobType}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500">
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
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Salary Range
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="e.g. $80k - $120k"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500"
            />
            
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Source
            </label>
            <input
              type="text"
              name='source'
              value={formData.source}
              onChange={handleInputChange}
              placeholder="LinkedIn, Referral..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Status & Dates */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Status & Dates
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status *
            </label>
            <select name="status" value={formData.status}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500">
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="follow-up">Follow-up</option>
            </select>
            <ErrorMessage error={errors.status} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Date Applied *
            </label>
            <input
              type="date"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500"
            />
            <ErrorMessage error={errors.dateApplied} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Follow-up Date
            </label>
            <input
              type="date"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500"
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
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Application Notes
          </label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={5}
            placeholder="Add any notes about this application..."
            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500"
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={resetForm}
          className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
        >
          Clear Form
        </button>

        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
        >
          Save Application
        </button>
      </div>
    </form>
  )
}