import applications from "../data/applications";
import StatCard from "../components/StatCard";
import Upcoming from "../components/upcoming";
import { BadgeCheck, BriefcaseBusiness, Clock3, CircleX, Handshake } from "lucide-react";
export default function AddApplication() {

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
  console.log(upcomingInterviews);
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
        <div className="lg:col-span-2  rounded-lg p-4 bg-white">
          app act
        </div>

        {/* RIGHT: Upcoming */}
        <div className=" p-4 bg-white col-span-1 border border-slate-200 rounded-2xl shadow-2xs">
          <div className="mb-4 text-lg font-semibold">Upcoming</div>
          <div className="flex flex-col gap-4">
            {upcomingInterviews.length === 0 ? (
              <p className="text-sm text-gray-500">No upcoming interviews or follow-ups.</p>
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
    </section>
  );
}