import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number;
  subtitle: string;
  icon: LucideIcon;
    iconBg?: string; // optional prop for background color of the icon container. you see that ? mark
};

export default function StatCard({ title, value, subtitle, icon: LucideIcon, iconBg }: StatCardProps) {
    return (
        <article className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-2">
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <p className="text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
                    <p className="text-sm font-medium text-emerald-600">{subtitle}</p>
                </div>
                <div className={`shrink-0 rounded-2xl p-3 ${iconBg ?? "bg-slate-100 text-slate-700"}`}>
                    <LucideIcon className="h-5 w-5" />
                </div>
            </div>
        </article>
    );
}