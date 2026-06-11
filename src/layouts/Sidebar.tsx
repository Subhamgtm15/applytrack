import { BriefcaseBusiness, CirclePlus, LayoutGrid, Settings, Target } from "lucide-react";
import { NavLink } from 'react-router-dom';

type SidebarProps = {
    onNavigate?: () => void;
};

export default function Sidebar({ onNavigate }: SidebarProps) {
    const navItems = [
        { to: "/", label: "Dashboard", icon: LayoutGrid },
        { to: "/applications", label: "Applications", icon: BriefcaseBusiness },
        { to: "/addapplication", label: "Add Application", icon: CirclePlus },
        { to: "/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen flex-col px-4 py-5 text-slate-700">
            <div className="flex items-center gap-3 px-3 py-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
                    <Target className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-2xl font-semibold tracking-tight text-slate-900">ApplyTrack</p>
                </div>
            </div>

            <nav className="mt-8 flex-1 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === "/"}
                            onClick={onNavigate}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                                }`
                            }
                        >
                            <Icon className="h-4.5 w-4.5" />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="rounded-3xl bg-indigo-50 p-4">
                <p className="text-sm font-semibold text-indigo-600">This Month</p>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center justify-between">
                        <span>Applications</span>
                        <span className="font-semibold text-slate-900">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Interviews</span>
                        <span className="font-semibold text-slate-900">2</span>
                    </div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-indigo-100">
                    <div className="h-2 w-1/3 rounded-full bg-indigo-500" />
                </div>
                <p className="mt-3 text-xs text-slate-500">25% interview rate</p>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 px-3 py-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
                    A
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-900">Alex Morgan</p>
                    <p className="text-xs text-slate-500">alex@example.com</p>
                </div>
            </div>
        </div>
    )
}