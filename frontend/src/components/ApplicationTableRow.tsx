import { Eye, MapPin, Pencil, Trash2, Calendar, Briefcase, DollarSign } from "lucide-react";
import type { Application } from "../data/applications";
import { updateApplication } from "../services/applicationService";
type ApplicationTableRowProps = {
  application: Application;
  deleteApplication: (id: number) => void;
  editApplication: (id: number) => void;
};

const statusBadgeClasses: Record<Application["status"], string> = {
  applied: "bg-blue-50 text-blue-600 ring-blue-100 dark:bg-blue-900/40 dark:text-blue-300 dark:ring-blue-800",
  interview: "bg-purple-50 text-purple-600 ring-purple-100 dark:bg-violet-900/40 dark:text-violet-300 dark:ring-violet-800",
  offer: "bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-300 dark:ring-emerald-800",
  rejected: "bg-red-50 text-red-600 ring-red-100 dark:bg-red-900/40 dark:text-red-300 dark:ring-red-800",
  "follow-up": "bg-amber-50 text-amber-600 ring-amber-100 dark:bg-amber-900/40 dark:text-amber-300 dark:ring-amber-800",
};
// this means object has keys of type Application["status"] (which is a union of the possible status values) and values of type string (the CSS classes for each status badge). 
//console.log(typeof statusBadgeClasses);  // this will log "object" to the console, 

const avatarColors = [
  "bg-indigo-500",
  "bg-violet-500",
  "bg-sky-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-orange-500",
  "bg-rose-500",
  "bg-slate-900",
];

function getAvatarColor(company: string) {
  const colorIndex = company
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0) % avatarColors.length;

  return avatarColors[colorIndex];
} // simple hash function to get a consistent color index based on company name.

function formatShortDate(date?: string) {
  if (!date) {
    return "-";
  }// if date is undefined or null, return a dash to indicate no date available.

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });  // formats the date to a shorter format like "Sep 15". If date is valid, it will return the formatted date string. If date is invalid, it will return "Invalid Date".
}


export default function ApplicationTableRow({ application,deleteApplication,editApplication }: ApplicationTableRowProps) {
  const avatarColor = getAvatarColor(application.company);
  const companyInitial = application.company.slice(0, 1).toUpperCase();

  return (
    <>
      {/* ── MOBILE card (hidden on lg+) ── */}
      <div className="flex flex-col gap-3 px-4 py-4 lg:hidden">

        {/* Top row: avatar + company info + status badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold text-white ${avatarColor}`}>
              {companyInitial}
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">{application.company}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{application.role}</p>
            </div>
          </div>
          <span className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${statusBadgeClasses[application.status]}`}>
            {application.status}
          </span>
        </div>

        {/* Meta row: location, date, salary, type */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 pl-[52px] text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {application.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            {formatShortDate(application.dateApplied)}
          </span>
          {application.salary && (
            <span className="flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5 shrink-0" />
              {application.salary}
            </span>
          )}
          <span className="flex items-center gap-1 capitalize">
            <Briefcase className="h-3.5 w-3.5 shrink-0" />
            {application.jobType}
          </span>
          {application.followUpDate && (
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              Follow-up {formatShortDate(application.followUpDate)}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pl-13">
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700" aria-label={`View ${application.company}`}>
            <Eye className="h-3.5 w-3.5" /> View
          </button>
          <button onClick={()=>editApplication(application.id)} className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700" aria-label={`Edit ${application.company}`}>
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
          <button onClick={()=>deleteApplication(application.id)} className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50 dark:border-slate-700 dark:text-red-400 dark:hover:bg-red-900/20" aria-label={`Delete ${application.company}`}>
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      </div>

      {/* ── DESKTOP row (hidden below lg) ── */}
      <div className="hidden gap-4 px-6 py-5 lg:grid lg:grid-cols-[2.2fr_1.8fr_1.2fr_1.6fr_1fr_1fr_96px] lg:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold text-white ${avatarColor}`}>
            {companyInitial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">{application.company}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{application.jobType}</p>
          </div>
        </div>

        <div>
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{application.role}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{application.salary ?? "-"}</p>
        </div>

        <div>
          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold capitalize ring-1 ${statusBadgeClasses[application.status]}`}>
            {application.status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <MapPin className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
          <span>{application.location}</span>
        </div>

        <div className="text-sm text-slate-500 dark:text-slate-400">{formatShortDate(application.dateApplied)}</div>

        <div className="text-sm text-amber-600 dark:text-amber-300">{formatShortDate(application.followUpDate)}</div>

        <div className="flex items-center gap-3 text-slate-400 dark:text-slate-400">
          <button className="rounded-lg p-1 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700/50 dark:hover:text-slate-200" aria-label={`View ${application.company}`}>
            <Eye className="h-4 w-4" />
          </button>
          <button onClick={()=>editApplication(application.id)} className="rounded-lg p-1 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700/50 dark:hover:text-slate-200" aria-label={`Edit ${application.company}`}>
            <Pencil className="h-4 w-4" />
          </button>
          <button onClick={()=>deleteApplication(application.id)} className="rounded-lg p-1 transition hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-700/50" aria-label={`Delete ${application.company}`}>
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
