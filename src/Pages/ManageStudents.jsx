const students = [
  { name: "Arif Hassan",   id: "SEC-2021-001", dept: "CSE",   session: "2021-22", status: "Active",    badge: "bg-green-500/20 text-green-400" },
  { name: "Nadia Islam",   id: "SEC-2021-042", dept: "EEE",   session: "2021-22", status: "Active",    badge: "bg-green-500/20 text-green-400" },
  { name: "Tanvir Ahmed",  id: "SEC-2022-018", dept: "CSE",   session: "2022-23", status: "Active",    badge: "bg-green-500/20 text-green-400" },
  { name: "Sumaiya Begum", id: "SEC-2022-067", dept: "Civil", session: "2022-23", status: "Suspended", badge: "bg-red-500/20 text-red-400" },
];

const ManageStudents = () => {
  return (
    <div className="bg-navy-card border border-navy-border rounded-lg overflow-hidden">
      <div className="px-3.5 py-2.5 border-b border-navy-border flex items-center justify-between">
        <input className="bg-navy-elevated border border-navy-border text-text-base text-xs px-3 py-1.5 rounded outline-none focus:ring-1 focus:ring-gold w-40" placeholder="Search students..." />
        <button className="bg-gold text-navy text-xs font-medium px-3 py-1.5 rounded">+ Add Student</button>
      </div>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            {["Name", "Student ID", "Dept", "Session", "Status", "Actions"].map((h) => (
              <th key={h} className="px-3.5 py-2 text-left text-[10px] text-text-muted font-medium border-b border-navy-border">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i} className="hover:bg-navy-elevated/30">
              <td className="px-3.5 py-2.5 text-text-base">{s.name}</td>
              <td className="px-3.5 py-2.5 text-gold">{s.id}</td>
              <td className="px-3.5 py-2.5 text-text-muted">{s.dept}</td>
              <td className="px-3.5 py-2.5 text-text-muted">{s.session}</td>
              <td className="px-3.5 py-2.5"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${s.badge}`}>{s.status}</span></td>
              <td className="px-3.5 py-2.5"><button className="bg-red-500/10 text-red-400 text-[11px] px-2.5 py-1 rounded">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudents;