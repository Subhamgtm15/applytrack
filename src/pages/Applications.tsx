import { ArrowUpDown, ChevronDown, PlusCircle, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import ApplicationTableRow from "../components/ApplicationTableRow";
import applications from "../data/applications";
import {useState} from "react";

export default function Applications() {
  const sortedApplications = [...applications].sort((firstApp, secondApp) => {
    return new Date(secondApp.dateApplied).getTime() - new Date(firstApp.dateApplied).getTime();
  }); // Sort applications by date applied, most recent first

  const [searchInput, setSearchInput] = useState("");
  const filteredApplications = sortedApplications.filter((application) => {
    const query = searchInput.toLowerCase();

    return (
      application.company.toLowerCase().includes(query) ||
      application.role.toLowerCase().includes(query)
    );
  });
  console.log(filteredApplications);
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
            type="text" value={searchInput} onChange={(e)=>{
              return setSearchInput(e.target.value);
            }}
            placeholder="Search company or title..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-300">
            <SlidersHorizontal className="h-4 w-4" />
            Status: All
            <ChevronDown className="h-4 w-4" />
          </button>

          <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-300">
            <SlidersHorizontal className="h-4 w-4" />
            Type: All
            <ChevronDown className="h-4 w-4" />
          </button>

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