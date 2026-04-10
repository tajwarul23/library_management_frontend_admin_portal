const books = [
  { title: "Clean Code",              author: "Robert C. Martin", category: "Programming",  total: 5, available: 3 },
  { title: "The Pragmatic Programmer",author: "Hunt & Thomas",    category: "Programming",  total: 3, available: 0 },
  { title: "Design Patterns",         author: "Gang of Four",     category: "Software Eng.",total: 4, available: 2 },
  { title: "Algorithms (CLRS)",       author: "Cormen et al.",    category: "CS Theory",    total: 6, available: 5 },
];

const ManageBooks = () => {
  return (
    <div className="bg-navy-card border border-navy-border rounded-lg overflow-hidden">
      <div className="px-3.5 py-2.5 border-b border-navy-border flex items-center justify-between">
        <input className="bg-navy-elevated border border-navy-border text-text-base text-xs px-3 py-1.5 rounded outline-none focus:ring-1 focus:ring-gold w-40" placeholder="Search books..." />
        <button className="bg-gold text-navy text-xs font-medium px-3 py-1.5 rounded">+ Add Book</button>
      </div>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            {["Title", "Author", "Category", "Total", "Available", "Actions"].map((h) => (
              <th key={h} className="px-3.5 py-2 text-left text-[10px] text-text-muted font-medium border-b border-navy-border">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.map((b, i) => (
            <tr key={i} className="hover:bg-navy-elevated/30">
              <td className="px-3.5 py-2.5 text-text-base">{b.title}</td>
              <td className="px-3.5 py-2.5 text-text-muted">{b.author}</td>
              <td className="px-3.5 py-2.5 text-text-muted">{b.category}</td>
              <td className="px-3.5 py-2.5 text-text-muted">{b.total}</td>
              <td className={`px-3.5 py-2.5 font-medium ${b.available === 0 ? "text-red-400" : "text-green-400"}`}>{b.available}</td>
              <td className="px-3.5 py-2.5 flex gap-2">
                <button className="border border-navy-border text-text-muted text-[11px] px-2.5 py-1 rounded hover:text-text-base">Edit</button>
                <button className="bg-red-500/10 text-red-400 text-[11px] px-2.5 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooks;