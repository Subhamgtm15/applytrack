import { ArrowUpDown, ChevronDown, PlusCircle, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import ApplicationTableRow from "../components/ApplicationTableRow";
import applications from "../data/applications";
import type { Application } from "../data/applications";
import { useState } from "react";

export default function Applications() {
  const sortedApplications = [...applications].sort((firstApp, secondApp) => {
    return new Date(secondApp.dateApplied).getTime() - new Date(firstApp.dateApplied).getTime();
  }); // Sort applications by date applied, most recent first

  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Application["status"]>("all");// State to track the selected job type filter, initialized to "all" to show all job types by default.
  const [typeFilter, setTypeFilter] = useState<"all" | Application["jobType"]>("all"); // State to track the selected status filter, initialized to "all" to show all statuses by default. the part after | represents the possible values for the status filter, which are derived from the Application type's status property. the > symbol is used to indicate that the type of statusFilter can be either "all" or any of the specific status values defined in the Application type. This allows for strong typing and ensures that only valid status values can be assigned to the statusFilter state.

  const filteredApplications = sortedApplications.filter((application) => {
    const query = searchInput.toLowerCase();
    const matchesSearch =
      application.company.toLowerCase().includes(query) ||
      application.role.toLowerCase().includes(query);
    const matchesStatus =
      statusFilter === "all" || application.status === statusFilter;
    const matchesType =
      typeFilter === "all" || application.jobType === typeFilter; // Check if the application's job type matches the selected type filter, or if the filter is set to "all" to include all job types.

    return matchesSearch && matchesStatus && matchesType;

  });

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">All Applications</h1>
          <p className="mt-1 text-sm text-slate-500">{filteredApplications.length} of {sortedApplications.length} applications</p>
        </div>

        <Link
          to="/addapplication"
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
        >
          <PlusCircle className="h-4 w-4" />
          Add New
        </Link>
      </div>

      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative w-full xl:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text" value={searchInput} onChange={(e) => {
              return setSearchInput(e.target.value);
            }}
            placeholder="Search company or title..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-300">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as "all" | Application["status"])}
              className="bg-transparent text-sm font-medium text-slate-700 outline-none"
            >
              <option value="all">All</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="follow-up">Follow-up</option>
            </select>
          </label>

          <label className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-300">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Type:</span>
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value as "all" | Application["jobType"])} // Update the typeFilter state based on the selected option in the dropdown. The value is cast to "all" or a specific job type from the Application type to ensure type safety.
              className="bg-transparent text-sm font-medium text-slate-700 outline-none"
            >
              <option value="all">All</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="remote">Remote</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
            </select> 
            {/* // Dropdown to filter applications by job type, with options for all job types and specific types like full-time, part-time, remote, contract, and freelance. The onChange handler updates the typeFilter state based on the selected option. */}
          </label>

          <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-300">
            <ArrowUpDown className="h-4 w-4" />
            Sort: Date Applied
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="hidden grid-cols-[2.2fr_1.8fr_1.2fr_1.6fr_1fr_1fr_96px] gap-4 border-b border-slate-200 bg-slate-50/80 px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 lg:grid">
          <span>Company</span>
          <span>Title</span>
          <span>Status</span>
          <span>Location</span>
          <span>Applied</span>
          <span>Follow-up</span>
          <span />
        </div>

        <div className="divide-y divide-slate-100">
          {filteredApplications.map((application) => (
            <ApplicationTableRow key={application.id} application={application} />
          ))}
        </div>
      </div>
    </section>
  );
}