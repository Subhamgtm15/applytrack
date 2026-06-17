import { ChevronRight } from "lucide-react";
import type { Application } from "../data/applications";

type RecentApplicationRowProps = {
  application: Application;
};

const statusBadgeClasses: Record<Application["status"], string> = {
  applied: "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:ring-blue-800",
  interview: "bg-purple-50 text-purple-700 ring-purple-200 dark:bg-violet-900/40 dark:text-violet-300 dark:ring-violet-800",
  offer: "bg-green-50 text-green-700 ring-green-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:ring-emerald-800",
  rejected: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-900/40 dark:text-red-300 dark:ring-red-800",
  "follow-up": "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:ring-amber-800",
};

const avatarColors = [
  "bg-rose-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-indigo-500",
  "bg-fuchsia-500",
];

export default function RecentApplicationRow({ application }: RecentApplicationRowProps) {
  const initial = application.company.slice(0, 1).toUpperCase();
  const colorIndex = application.company
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0) % avatarColors.length;
  const avatarColor = avatarColors[colorIndex];
  
  return (
    <div className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-3.5">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold tracking-tight text-white ${avatarColor}`}>
          {initial}
        </div>

        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold tracking-tight text-slate-900 dark:text-slate-100">{application.company}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">{application.role}</span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span>{application.location}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 md:justify-end">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${statusBadgeClasses[application.status]}`}>
          {application.status}
        </span>
        <span className="min-w-24 text-[13px] font-medium text-slate-500 dark:text-slate-400">
          {new Date(application.dateApplied).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
      </div>
    </div>
  );
}