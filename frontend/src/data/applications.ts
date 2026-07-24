export type ApplicationStatus = "applied"| "interview"| "offer"| "rejected"| "follow-up";

export type JobType = "full-time"| "part-time"| "remote"| "contract"| "freelance"| "internship";

export type Application = {
  id: number;
  company: string;
  role: string;
  location: string;
  jobType: JobType;
  status: ApplicationStatus;
  hadInterview?: boolean; // permanent milestone: true once the application reached the interview stage (server-managed)
  dateApplied: string;
  followUpDate?: string;
  interviewDate?: string; // scheduled interview date, used for the "Upcoming Interviews" feature
  salary?: string;
  source?: string;
  notes?: string;
  user_id?: number;
};
