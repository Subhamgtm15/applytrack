import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number;
  subtitle: ReactNode; // can be plain text or a custom node (e.g. an arrow + colored text)
  icon: LucideIcon;
    iconBg?: string; // optional prop for background color of the icon container. you see that ? mark
};

export default function StatCard({ title, value, subtitle, icon: LucideIcon, iconBg }: StatCardProps) {
    return (
        <article className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
            <div className="flex items-start justify-between gap-2 sm:gap-4">
                        <div className="min-w-0 space-y-1 sm:space-y-2">
                            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{value}</p>
                            <div className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-300">{subtitle}</div>
                </div>
                <div className={`shrink-0 rounded-xl sm:rounded-2xl p-2 sm:p-3 ${iconBg ?? "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200"}`}>
                    <LucideIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
            </div>
        </article>
    );
}