import { useState } from "react";

const sessionData = {
  "2021-22": [
    { name: "Arif Hassan",   id: "SEC-2021-001", dept: "CSE",   status: "Active",    badge: "bg-green-500/20 text-green-400" },
    { name: "Nadia Islam",   id: "SEC-2021-042", dept: "EEE",   status: "Active",    badge: "bg-green-500/20 text-green-400" },
  ],
  "2022-23": [
    { name: "Tanvir Ahmed",  id: "SEC-2022-018", dept: "CSE",   status: "Active",    badge: "bg-green-500/20 text-green-400" },
    { name: "Sumaiya Begum", id: "SEC-2022-067", dept: "Civil", status: "Suspended", badge: "bg-red-500/20 text-red-400" },
  ],
  "2023-24": [
    { name: "Rakib Hossain", id: "SEC-2023-003", dept: "Mechanical", status: "Active", badge: "bg-green-500/20 text-green-400" },
  ],
  "2024-25": [],
};

const SessionWise = () => {
  const [active, setActive] = useState("2021-22");
  const data = sessionData[active];

  return (
    <>
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {Object.keys(sessionData).map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={`text-xs px-3 py-1.5 rounded font-medium transition-all ${active === s ? "bg-gold text-navy" : "border border-navy-border text-text-muted hover:text-text-base"}`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="bg-navy-card border border-navy-border rounded-lg overflow-hidden">
        <div className="px-3.5 py-2.5 border-b border-navy-border flex justify-between items-center">
          <p className="text-[10px] text-text-muted uppercase tracking-wide">Session {active}</p>
          <p className="text-xs text-text-muted">{data.length} students</p>
        </div>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              {["Name", "Student ID", "Department", "Status"].map((h) => (
                <th key={h} className="px-3.5 py-2 text-left text-[10px] text-text-muted font-medium border-b border-navy-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length ? data.map((s, i) => (
              <tr key={i} className="hover:bg-navy-elevated/30">
                <td className="px-3.5 py-2.5 text-text-base">{s.name}</td>
                <td className="px-3.5 py-2.5 text-gold">{s.id}</td>
                <td className="px-3.5 py-2.5 text-text-muted">{s.dept}</td>
                <td className="px-3.5 py-2.5"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${s.badge}`}>{s.status}</span></td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="px-3.5 py-6 text-center text-text-muted text-xs">No students found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SessionWise;