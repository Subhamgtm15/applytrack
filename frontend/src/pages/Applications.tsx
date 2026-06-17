import { ArrowUpDown, ChevronDown, PlusCircle, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import ApplicationTableRow from "../components/ApplicationTableRow";
import type { Application } from "../data/applications";
import { useState, useEffect } from "react";

export default function Applications() {
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/applications'); // 1. Fetch data from the backend API
        const result = await response.json();
        const normalized = result.applications.map((app: any) => ({
          ...app,
          dateApplied: app.date_applied,
          followUpDate: app.follow_up_date,
        }));
        setApplications(normalized);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchApplications();
  }, []);
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Application["status"]>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | Application["jobType"]>("all");
  const [sortOption, setSortOption] = useState<"date-desc" | "date-asc" | "company-asc">("date-desc"); //this means sortoptions has three possible values but initially set to "date-desc"  

  const filteredApplications = applications.filter((application) => {
    const query = searchInput.toLowerCase();
    const matchesSearch =
      application.company.toLowerCase().includes(query) ||
      application.role.toLowerCase().includes(query);
    const matchesStatus =
      statusFilter === "all" || application.status === statusFilter;
    const matchesType =
      typeFilter === "all" || application.jobType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const displayedApplications = [...filteredApplications].sort((firstApp, secondApp) => {
    if (sortOption === "date-asc") {
      return new Date(firstApp.dateApplied).getTime() - new Date(secondApp.dateApplied).getTime();
    }

    if (sortOption === "company-asc") {
      return firstApp.company.localeCompare(secondApp.company);
    }

    return new Date(secondApp.dateApplied).getTime() - new Date(firstApp.dateApplied).getTime();
  });

  const deleteApplication = async (id: number) => {
    // Implement the logic to delete the application with the given id

    try {
      const response = await fetch(`http://localhost:5000/applications/${id}`, {
        method: 'DELETE',
      })
      const deletedApplication = await response.json();
      console.log('Deleted application:', deletedApplication.deletedApplication);
    }
    catch (error) {
      console.error('Error deleting application:', error);
    }

    setApplications((prev) =>
      prev.filter((app) => app.id !== id)  //app.id is string but id is number 
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">All Applications</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{displayedApplications.length} of {applications.length} applications</p>
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
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-400" />
          <input
            type="text" value={searchInput} onChange={(e) => {
              return setSearchInput(e.target.value);
            }}
            placeholder="Search company or title..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as "all" | Application["status"])}
              className="bg-transparent text-sm font-medium text-slate-700 outline-none dark:text-slate-200"
            >
              <option value="all">All</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="follow-up">Follow-up</option>
            </select>
          </label>

          <label className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Type:</span>
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value as "all" | Application["jobType"])} // Update the typeFilter state based on the selected option in the dropdown. The value is cast to "all" or a specific job type from the Application type to ensure type safety.
              className="bg-transparent text-sm font-medium text-slate-700 outline-none dark:text-slate-200"
            >
              <option value="all">All</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="remote">Remote</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
            </select>
          </label>

          <label className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600">
            <ArrowUpDown className="h-4 w-4" />
            <span>Sort:</span>
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value as "date-desc" | "date-asc" | "company-asc")}
              className="bg-transparent text-sm font-medium text-slate-700 outline-none dark:text-slate-200"
            >
              <option value="date-desc">Date Applied</option>
              <option value="date-asc">Oldest Applied</option>
              <option value="company-asc">Company A-Z</option>
            </select>
          </label>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="hidden grid-cols-[2.2fr_1.8fr_1.2fr_1.6fr_1fr_1fr_96px] gap-4 border-b border-slate-200 bg-slate-50/80 px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 lg:grid dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
          <span>Company</span>
          <span>Title</span>
          <span>Status</span>
          <span>Location</span>
          <span>Applied</span>
          <span>Follow-up</span>
          <span />
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {displayedApplications.map((application) => (
            <ApplicationTableRow key={application.id} application={application} deleteApplication={deleteApplication} />
          ))}
        </div>
      </div>
    </section>
  );
}