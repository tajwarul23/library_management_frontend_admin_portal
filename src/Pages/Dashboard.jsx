import StatCard from "@/components/StatCard";

const stats = [
  { label: "Total Books",   value: "1,240", delta: "+12 this week",   color: "#F59E0B" },
  { label: "Students",      value: "386",   delta: "+5 today",        color: "#3FB950" },
  { label: "Reservations",  value: "43",    delta: "8 expiring soon", color: "#58A6FF" },
  { label: "Overdue",       value: "7",     delta: "Action needed",   color: "#F85149" },
];

const recentActivity = [
  { student: "Arif Hassan",   book: "Clean Code",        action: "Issued",   date: "Mar 13", status: "Borrowed",  badge: "bg-blue-500/20 text-blue-400" },
  { student: "Nadia Islam",   book: "Algorithms",        action: "Reserved", date: "Mar 12", status: "Pending",   badge: "bg-yellow-500/20 text-yellow-400" },
  { student: "Tanvir Ahmed",  book: "Design Patterns",   action: "Returned", date: "Mar 11", status: "Returned",  badge: "bg-green-500/20 text-green-400" },
  { student: "Rakib Hossain", book: "Database Systems",  action: "Issued",   date: "Mar 10", status: "Overdue",   badge: "bg-red-500/20 text-red-400" },
];

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-2.5 mb-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="bg-navy-card border border-navy-border rounded-lg overflow-hidden">
        <div className="px-3.5 py-2.5 border-b border-navy-border">
          <p className="text-[10px] text-text-muted uppercase tracking-wide">Recent Activity</p>
        </div>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              {["Student", "Book", "Action", "Date", "Status"].map((h) => (
                <th key={h} className="px-3.5 py-2 text-left text-[10px] text-text-muted font-medium border-b border-navy-border">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((row, i) => (
              <tr key={i} className="hover:bg-navy-elevated/30">
                <td className="px-3.5 py-2.5 text-text-base">{row.student}</td>
                <td className="px-3.5 py-2.5 text-text-muted">{row.book}</td>
                <td className="px-3.5 py-2.5 text-text-muted">{row.action}</td>
                <td className="px-3.5 py-2.5 text-text-muted">{row.date}</td>
                <td className="px-3.5 py-2.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${row.badge}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;