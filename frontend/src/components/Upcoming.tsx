import type { LucideIcon } from "lucide-react";

type UpcomingProps = {
  company: string;
  role: string;
  status: string;
  icon: LucideIcon;
  iconBg?: string;
};

export default function Upcoming({
  company,
  role,
  status,
  icon: Icon,
  iconBg,
}: UpcomingProps) {
  const initial = company?.slice(0, 1).toUpperCase() || "?";  // to show company initial in avatar

  const avatarColors = [
    "bg-rose-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-sky-500",
    "bg-indigo-500",
    "bg-fuchsia-500",
  ]; //array of colors for avatar background.
  const colorIndex = company
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0) % avatarColors.length; // simple hash function to get a consistent color index based on company name.
    //charCodeAt() gives you the ASCII / Unicode number of a character.
    // reduce loops through each character in the company name, sums up their char codes
  const avatarColor = avatarColors[colorIndex];  


  const isInterview = status.toLowerCase() === "interview"; // we can use this boolean to conditionally style the status badge differently for interviews vs follow-ups.

  const statusClasses = isInterview
    ? "bg-purple-100 text-purple-700 ring-purple-200"
    : "bg-amber-100 text-amber-700 ring-amber-200"; // different colors for interview vs follow-up status badges.

  return (
    <article className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700/50">
      <div className="flex shrink-0 justify-start">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold text-white ${avatarColor}`}>
          {initial}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{company}</p>
        <p className="truncate text-xs text-slate-500 dark:text-slate-400">{role}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <div className={`rounded-full p-2 ${iconBg ?? "bg-slate-100 text-slate-700"}`}>
          <Icon className="h-4 w-4" />
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ring-1 ${statusClasses} dark:ring-0`}>
          {status}
        </span>
      </div>
    </article>
  );
}