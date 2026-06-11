import { ChevronRight } from "lucide-react";
import type { Application } from "../data/applications";

type RecentApplicationRowProps = {
  application: Application;
};

const statusBadgeClasses: Record<Application["status"], string> = {
  applied: "bg-blue-50 text-blue-700 ring-blue-200",
  interview: "bg-purple-50 text-purple-700 ring-purple-200",
  offer: "bg-green-50 text-green-700 ring-green-200",
  rejected: "bg-red-50 text-red-700 ring-red-200",
  "follow-up": "bg-amber-50 text-amber-700 ring-amber-200",
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
      <div className="flex min-w-0 items-center gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${avatarColor}`}>
          {initial}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">{application.company}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
            <span className="font-medium text-slate-700">{application.role}</span>
            <span className="text-slate-300">/</span>
            <span>{application.location}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 md:justify-end">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${statusBadgeClasses[application.status]}`}
        >
          {application.status}
        </span>
        <span className="min-w-24 text-xs font-medium text-slate-500">
          {new Date(application.dateApplied).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
      </div>
    </div>
  );
}