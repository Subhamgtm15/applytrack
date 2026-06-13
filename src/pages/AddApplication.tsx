export default function AddApplication() {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
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
          placeholder="e.g. Stripe"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Job Title *
        </label>
        <input
          type="text"
          placeholder="e.g. Frontend Engineer"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Location *
        </label>
        <input
          type="text"
          placeholder="e.g. Kathmandu, Nepal"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Job Type *
        </label>
        <select className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500">
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Remote</option>
          <option>Contract</option>
          <option>Freelance</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Salary Range
        </label>
        <input
          type="text"
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
        <select className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500">
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
          <option>Follow-up</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Date Applied *
        </label>
        <input
          type="date"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Follow-up Date
        </label>
        <input
          type="date"
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
      className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
    >
      Cancel
    </button>

    <button
      type="button"
      className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
    >
      Save Application
    </button>
  </div>
</div>
  )
}