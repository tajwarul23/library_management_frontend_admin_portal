const issued = [
  { id: "ISS-001", student: "Arif Hassan",   book: "Clean Code",        issuedOn: "Mar 01", due: "Mar 15", status: "Borrowed", badge: "bg-blue-500/20 text-blue-400",  dueColor: "" },
  { id: "ISS-002", student: "Nadia Islam",   book: "Pragmatic Prog.",   issuedOn: "Feb 20", due: "Mar 06", status: "Overdue",  badge: "bg-red-500/20 text-red-400",   dueColor: "text-red-400" },
  { id: "ISS-003", student: "Tanvir Ahmed",  book: "Algorithms",        issuedOn: "Mar 05", due: "Mar 19", status: "Borrowed", badge: "bg-blue-500/20 text-blue-400",  dueColor: "" },
  { id: "ISS-004", student: "Sumaiya Begum", book: "Design Patterns",   issuedOn: "Feb 15", due: "Mar 01", status: "Returned", badge: "bg-green-500/20 text-green-400",dueColor: "" },
];

const IssuedBooks = () => {
  return (
    <div className="bg-navy-card border border-navy-border rounded-lg overflow-hidden">
      <div className="px-3.5 py-2.5 border-b border-navy-border flex items-center justify-between">
        <p className="text-[10px] text-text-muted uppercase tracking-wide">Issued Books</p>
        <input className="bg-navy-elevated border border-navy-border text-text-base text-xs px-3 py-1.5 rounded outline-none focus:ring-1 focus:ring-gold w-40" placeholder="Search..." />
      </div>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            {["Issue ID", "Student", "Book", "Issued", "Due Date", "Status"].map((h) => (
              <th key={h} className="px-3.5 py-2 text-left text-[10px] text-text-muted font-medium border-b border-navy-border">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {issued.map((r, i) => (
            <tr key={i} className="hover:bg-navy-elevated/30">
              <td className="px-3.5 py-2.5 text-gold">{r.id}</td>
              <td className="px-3.5 py-2.5 text-text-base">{r.student}</td>
              <td className="px-3.5 py-2.5 text-text-muted">{r.book}</td>
              <td className="px-3.5 py-2.5 text-text-muted">{r.issuedOn}</td>
              <td className={`px-3.5 py-2.5 ${r.dueColor || "text-text-muted"}`}>{r.due}</td>
              <td className="px-3.5 py-2.5"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${r.badge}`}>{r.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuedBooks;