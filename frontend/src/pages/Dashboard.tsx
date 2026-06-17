import { useEffect, useState } from "react";
import type { Application } from "../data/applications";
import RecentApplicationRow from "../components/RecentApplicationRow";
import StatCard from "../components/StatCard";
import Upcoming from "../components/Upcoming";
import { BadgeCheck, BriefcaseBusiness, ChevronRight, Clock3, CircleX, Handshake } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Link } from "react-router-dom";
export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
    useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/applications'); // 1. Fetch data from the backend <API>
        const result = await response.json();
        setApplications(result.applications || []); // 2. Update state with results
      } catch (error) {
        console.error('Error fetching data:', error);
      } };  
    fetchApplications();
  }, []);

  const endOfCurrentWeek = new Date();
  endOfCurrentWeek.setHours(0, 0, 0, 0); //Remove Time Part

  const weeklyInterviewActivity = Array.from({ length: 6 }, (_, index) => { // _ is a common convention to indicate that we don't care about the first argument (the value) when creating an array with Array.from. We only care about the index, which we use to calculate the week range.

    // we create an array of 6 weeks (current week + previous 5 weeks) and map over it to calculate the interview count for each week.
    const weekEnd = new Date(endOfCurrentWeek); //
    weekEnd.setDate(endOfCurrentWeek.getDate() - (5 - index) * 7); // calculate the end date for each week by subtracting the appropriate number of days from the end of the current week. For index 0, we subtract 35 days (5 weeks), for index 1 we subtract 28 days (4 weeks), and so on until index 5 which is the current week with no subtraction.

    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekEnd.getDate() - 6);  // calculate the start date for each week by subtracting 6 days from the end date of the week. This gives us a 7-day range for each week (weekStart to weekEnd).


    const count = applications.filter((app) => {
      if (app.status !== "interview") {
        return false;
      }

      const appliedDate = new Date(`${app.dateApplied}T00:00:00`);
      return appliedDate >= weekStart && appliedDate <= weekEnd;
    }).length; // For each of the last 6 weeks, we calculate that week's start and end dates, then scan all applications and count how many interview applications fall within that week's date range.

    return {
      weekKey: `${weekStart.toISOString().slice(0, 10)}-${weekEnd.toISOString().slice(0, 10)}`,
      label: weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      rangeLabel: `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
      count,
      isCurrentWeek: index === 5,
    };
  });

  const recentApplications = [...applications]
    .sort((firstApp, secondApp) => {
      return new Date(secondApp.dateApplied).getTime() - new Date(firstApp.dateApplied).getTime();
    })
    .slice(0, 5);
  // const interviewCount = applications.filter((app) => {
  //   return app.status === "interview"
  // }).length;

  // const offerCount = applications.filter((app) => {
  //   return app.status === "offer"
  // }).length;

  // const rejectedCount = applications.filter((app) => {
  //   return app.status === "rejected"
  // }).length;

  // const followUpCount = applications.filter((app) => {
  //   return app.status === "follow-up"
  // }).length;  

  const statusCount = applications.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    {
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
      "follow-up": 0,
    } as Record<string, number>
  );//we loop through the array 5 separate times. reduce lets you summarize everything in one pass.


  //now for upcoming interviews, we can filter the applications to find those with status "interview" and a followUpDate.

  // const upcomingInterviews=applications.filter(app=>{
  //   return (app.status === "interview" || app.status==="follow-up") && app.followUpDate && new Date(app.followUpDate) > new Date();
  // })
  // console.log(upcomingInterviews);

  const now = new Date();

  // filter valid upcoming apps
  const validUpcoming = applications.filter((app) => {
    const hasFollowUp = !!app.followUpDate;      // check if followUpDate exists and is truthy

    const isValidStatus =
      app.status === "interview" || app.status === "follow-up";

    const isFutureDate =
      hasFollowUp && new Date(app.followUpDate!) >= now; // the ! tells typescript that we are sure followUpDate exists since hasFollowUp is true

    return isValidStatus && isFutureDate;
  });

  //  sort by nearest date
  const sortedUpcoming = validUpcoming.sort((a, b) => {
    return (
      new Date(a.followUpDate!).getTime() -
      new Date(b.followUpDate!).getTime() // the ! tells typescript that we are sure followUpDate exists since validUpcoming only contains apps with followUpDate
    );
  });

  // take only top 3
  const upcomingInterviews = sortedUpcoming.slice(0, 3);
  // console.log(upcomingInterviews);
  return (
    <section id="center ">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total Applied" value={applications.length} subtitle="+3 this week" icon={BriefcaseBusiness} iconBg="bg-blue-100 text-blue-600" />
        <StatCard title="Interviews" value={statusCount.interview} subtitle="2 upcoming" icon={Handshake} iconBg="bg-purple-100 text-purple-600" />
        <StatCard title="Offers" value={statusCount.offer} subtitle="Active" icon={BadgeCheck} iconBg="bg-green-100 text-green-600" />
        <StatCard title="Rejections" value={statusCount.rejected} subtitle="" icon={CircleX} iconBg="bg-red-100 text-red-600" />
        <StatCard title="Follow-ups" value={statusCount['follow-up']} subtitle="Due soon" icon={Clock3} iconBg="bg-yellow-100 text-yellow-600" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">

        {/* LEFT: Application Activity */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Application Activity</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">Interview applications grouped by week using the dateApplied field</p>
            </div>
            <div className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
              Week wise
            </div>
          </div>

          {/* bar chart showing the count of interview applications for each of the last 6 weeks, using the weeklyInterviewActivity data we calculated */}

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-700/50">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height={280} minWidth={0} minHeight={0}>
                <BarChart data={weeklyInterviewActivity} margin={{ top: 12, right: 12, left: -20, bottom: 8 }}>
                  <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(124, 58, 237, 0.08)" }}
                    contentStyle={{
                      borderRadius: "16px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                    }}
                    formatter={(value) => [`${value ?? 0} interviews`, "Count"]}
                    labelFormatter={(_, payload) => payload?.[0]?.payload?.rangeLabel ?? ""}
                  />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[14, 14, 0, 0]} maxBarSize={44} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RIGHT: Upcoming */}
        <div className="p-4 bg-white col-span-1 border border-slate-200 rounded-2xl shadow-2xs dark:bg-slate-800 dark:border-slate-700">
          <div className="mb-4 text-lg font-semibold dark:text-slate-100">Upcoming</div>
          <div className="flex flex-col gap-4">
            {upcomingInterviews.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-slate-400">No upcoming interviews or follow-ups.</p>
            ) : (
              upcomingInterviews.map((app) => (
                <Upcoming
                  key={app.id}
                  company={app.company}
                  role={app.role}
                  status={
                    app.status === "interview"
                      ? `Interview`
                      : `Follow-up`
                  }
                  icon={app.status === "interview" ? Handshake : Clock3}
                  iconBg={app.status === "interview" ? "bg-purple-100 text-purple-600" : "bg-yellow-100 text-yellow-600"}
                />
              ))
            )}
          </div>
        </div>
      </div>
      {/* // Recent Applications List */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Recent Applications</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">Newest applications first, sorted by the dateApplied field</p>
          </div>
          <Link
            to="/applications"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-700"
          >
            View all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {recentApplications.map((app) => (
            <RecentApplicationRow key={app.id} application={app} />
          ))}
        </div>
      </div>
      {/* // Call to Action for adding new application */}
      <div className="mt-6 rounded-3xl border border-indigo-100 bg-indigo-50/70 p-6 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/40">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl dark:text-slate-100">Ready to track a new application?</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">Log your latest job application in under a minute.</p>
          </div>

          <Link
            to="/addapplication"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full border border-white/60 text-xs leading-none">+</span>
            Add Application
          </Link>
        </div>
      </div>
    </section>
  );
}
