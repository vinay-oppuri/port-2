// "use client";

// import { useEffect, useState } from "react";
// import ActivityCalendar from "react-activity-calendar";

// const GithubActivityPage = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [total, setTotal] = useState<number>(0);

//   useEffect(() => {
//     async function load() {
//       const res = await fetch("/api/github/activity");
//       const json = await res.json();

//       const calendar =
//         json?.data?.user?.contributionsCollection?.contributionCalendar;

//       setTotal(calendar?.totalContributions || 0);

//       // Flatten all days from all weeks
//       const structured = calendar?.weeks
//         ?.flatMap((week: any) => week.contributionDays)
//         ?.map((day: any) => ({
//           date: day.date,
//           count: day.contributionCount,
//           level: getLevel(day.contributionCount), // 0-4 scale
//         }));

//       setData(structured);
//     }
//     load();
//   }, []);

//   // Convert GitHub color → level scale
//   function getLevel(count: number) {
//     if (count === 0) return 0;
//     if (count < 3) return 1;
//     if (count < 6) return 2;
//     if (count < 10) return 3;
//     return 4;
//   }

//   return (
//     <section className="p-10 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-1">
//         <p className="text-sm text-muted-foreground">Featured</p>
//         <h1 className="text-3xl font-bold text-foreground">
//           GitHub Activity
//         </h1>
//         <p className="text-muted-foreground">
//           Total: <span className="font-semibold">{total}</span> contributions
//         </p>
//       </div>

//       {/* Activity Calendar Card */}
//       <div className="rounded-xl border border-white/10 p-6 bg-[#0f0f0f]">
//         {data.length > 0 && (
//           <ActivityCalendar
//             data={data}
//             labels={{
//               totalCount: "{{count}} contributions",
//             }}
//             blockSize={13}
//             blockMargin={4}
//             colorScheme="dark"
//             theme={{
//               light: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
//               dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
//             }}
//           />
//         )}
//       </div>
//     </section>
//   );
// }
// export default GithubActivityPage