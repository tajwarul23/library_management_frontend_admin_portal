const reservations = [
  { student: "Arif Hassan",   book: "Clean Code",       reserved: "Mar 10", expires: "Mar 13", status: "Pending", badge: "bg-yellow-500/20 text-yellow-400", actions: true },
  { student: "Nadia Islam",   book: "Algorithms",       reserved: "Mar 12", expires: "Mar 15", status: "Pending", badge: "bg-yellow-500/20 text-yellow-400", actions: true },
  { student: "Tanvir Ahmed",  book: "Design Patterns",  reserved: "Mar 08", expires: "Mar 11", status: "Expired", badge: "bg-red-500/20 text-red-400",        actions: false },
  { student: "Rakib Hossain", book: "Database Systems", reserved: "Mar 13", expires: "Mar 16", status: "Issued",  badge: "bg-blue-500/20 text-blue-400",      actions: false },
];

const Reservations = () => {
  return (
    <div className="bg-navy-card border border-navy-border rounded-lg overflow-hidden">
      <div className="px-3.5 py-2.5 border-b border-navy-border flex items-center justify-between">
        <p className="text-[10px] text-text-muted uppercase tracking-wide">All Reservations</p>
        <div className="flex gap-1.5">
          {["Pending", "Issued", "Expired"].map((f) => (
            <span key={f} className="text-[10px] px-2.5 py-1 rounded-full bg-navy-elevated text-text-muted cursor-pointer hover:text-text-base">{f}</span>
          ))}
        </div>
      </div>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            {["Student", "Book", "Reserved", "Expires", "Status", "Actions"].map((h) => (
              <th key={h} className="px-3.5 py-2 text-left text-[10px] text-text-muted font-medium border-b border-navy-border">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reservations.map((r, i) => (
            <tr key={i} className="hover:bg-navy-elevated/30">
              <td className="px-3.5 py-2.5 text-text-base">{r.student}</td>
              <td className="px-3.5 py-2.5 text-text-muted">{r.book}</td>
              <td className="px-3.5 py-2.5 text-text-muted">{r.reserved}</td>
              <td className="px-3.5 py-2.5 text-text-muted">{r.expires}</td>
              <td className="px-3.5 py-2.5"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${r.badge}`}>{r.status}</span></td>
              <td className="px-3.5 py-2.5 flex gap-1.5">
                {r.actions && <>
                  <button className="bg-gold text-navy text-[11px] px-2.5 py-1 rounded font-medium">Issue</button>
                  <button className="bg-red-500/10 text-red-400 text-[11px] px-2.5 py-1 rounded">Cancel</button>
                </>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;