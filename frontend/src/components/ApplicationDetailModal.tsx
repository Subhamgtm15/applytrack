import { Briefcase, Calendar, DollarSign, Link2, MapPin, Pencil, StickyNote, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import type { Application } from "../data/applications";

type ApplicationDetailModalProps = {
  application: Application | null;
  onClose: () => void;
  editApplication: (id: number) => void;
  deleteApplication: (id: number) => void;
};

const statusBadgeClasses: Record<Application["status"], string> = {
  applied: "bg-blue-50 text-blue-600 ring-blue-100 dark:bg-blue-900/40 dark:text-blue-300 dark:ring-blue-800",
  interview: "bg-purple-50 text-purple-600 ring-purple-100 dark:bg-violet-900/40 dark:text-violet-300 dark:ring-violet-800",
  offer: "bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-300 dark:ring-emerald-800",
  rejected: "bg-red-50 text-red-600 ring-red-100 dark:bg-red-900/40 dark:text-red-300 dark:ring-red-800",
  "follow-up": "bg-amber-50 text-amber-600 ring-amber-100 dark:bg-amber-900/40 dark:text-amber-300 dark:ring-amber-800",
};

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
}

function formatLongDate(date?: string) {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ApplicationDetailModal({
  application,
  onClose,
  editApplication,
  deleteApplication,
}: ApplicationDetailModalProps) {
  // Close the modal when the Escape key is pressed.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (application) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [application, onClose]);

  if (!application) {
    return null;
  }

  const avatarColor = getAvatarColor(application.company);
  const companyInitial = application.company.slice(0, 1).toUpperCase();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${application.company} application details`}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700/50 dark:hover:text-slate-200"
          aria-label="Close details"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 border-b border-slate-200 px-6 py-6 pr-14 dark:border-slate-700">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-semibold text-white ${avatarColor}`}>
            {companyInitial}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-semibold text-slate-900 dark:text-slate-100">{application.company}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{application.role}</p>
            <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${statusBadgeClasses[application.status]}`}>
              {application.status}
            </span>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 gap-4 px-6 py-6 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Location</p>
              <p className="text-sm text-slate-700 dark:text-slate-200">{application.location || "-"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Job Type</p>
              <p className="text-sm capitalize text-slate-700 dark:text-slate-200">{application.jobType}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Date Applied</p>
              <p className="text-sm text-slate-700 dark:text-slate-200">{formatLongDate(application.dateApplied)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Follow-up</p>
              <p className="text-sm text-slate-700 dark:text-slate-200">{formatLongDate(application.followUpDate)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <DollarSign className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Salary</p>
              <p className="text-sm text-slate-700 dark:text-slate-200">{application.salary || "-"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Link2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Source</p>
              <p className="text-sm text-slate-700 dark:text-slate-200">{application.source || "-"}</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        {application.notes && (
          <div className="border-t border-slate-200 px-6 py-5 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <StickyNote className="h-4 w-4 shrink-0 text-slate-400" />
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Notes</p>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-200">{application.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4 dark:border-slate-700">
          <button
            onClick={() => {
              deleteApplication(application.id);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:border-slate-700 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
          <button
            onClick={() => {
              editApplication(application.id);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            <Pencil className="h-4 w-4" /> Edit
          </button>
        </div>
      </div>
    </div>
  );
}
