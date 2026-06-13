import { Eye, MapPin, Pencil, Trash2 } from "lucide-react";
import type { Application } from "../data/applications";
import { useState } from "react";
type ApplicationTableRowProps = {
  application: Application;
};

const statusBadgeClasses: Record<Application["status"], string> = {
  applied: "bg-blue-50 text-blue-600 ring-blue-100",
  interview: "bg-purple-50 text-purple-600 ring-purple-100",
  offer: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  rejected: "bg-red-50 text-red-600 ring-red-100",
  "follow-up": "bg-amber-50 text-amber-600 ring-amber-100",
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

export default function ApplicationTableRow({ application }: ApplicationTableRowProps) {
  const avatarColor = getAvatarColor(application.company);
  const companyInitial = application.company.slice(0, 1).toUpperCase();


  return (
    <div className="grid gap-4 px-6 py-5 lg:grid-cols-[2.2fr_1.8fr_1.2fr_1.6fr_1fr_1fr_96px] lg:items-center">
      <div className="flex min-w-0 items-center gap-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold text-white ${avatarColor}`}>
          {companyInitial}
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-slate-900">{application.company}</p>
          <p className="text-sm text-slate-500 capitalize">{application.jobType}</p>
        </div>
      </div>

      <div>
        <p className="text-base font-semibold text-slate-900">{application.role}</p>
        <p className="text-sm text-slate-500">{application.salary ?? "-"}</p>
      </div>

      <div>
        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold capitalize ring-1 ${statusBadgeClasses[application.status]}`}>
          {application.status}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
        <span>{application.location}</span>
      </div>

      <div className="text-sm text-slate-500">{formatShortDate(application.dateApplied)}</div>

      <div className="text-sm text-amber-600">{formatShortDate(application.followUpDate)}</div>

      <div className="flex items-center gap-3 text-slate-400">
        <button className="rounded-lg p-1 transition hover:bg-slate-100 hover:text-slate-600" aria-label={`View ${application.company}`}>
          <Eye className="h-4 w-4" />
        </button>
        <button className="rounded-lg p-1 transition hover:bg-slate-100 hover:text-slate-600" aria-label={`Edit ${application.company}`}>
          <Pencil className="h-4 w-4" />
        </button>
        <button className="rounded-lg p-1 transition hover:bg-slate-100 hover:text-red-500" aria-label={`Delete ${application.company}`}>
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}