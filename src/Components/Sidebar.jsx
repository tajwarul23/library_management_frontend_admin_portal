const navKeys = [
  "dashboard", "books", "students", "reservations",
  "issued", "return", "session", "department"
];

const Sidebar = ({ activePage, setActivePage, pages }) => {
  return (
    <div className="w-48 bg-navy-card border-r border-navy-border flex flex-col shrink-0">
      <div className="p-4 border-b border-navy-border flex items-center gap-2">
        <div className="bg-gold p-1.5 rounded text-sm font-medium text-navy">S</div>
        <div>
          <p className="text-xs font-medium text-text-base">SEC Library</p>
          <p className="text-[10px] text-text-muted">Admin Portal</p>
        </div>
      </div>
      <nav className="flex-1 p-2 overflow-y-auto">
        {navKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActivePage(key)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs mb-0.5 transition-all
              ${activePage === key
                ? "bg-gold/10 text-gold border-l-2 border-gold"
                : "text-text-muted hover:bg-navy-elevated hover:text-text-base"
              }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
            {pages[key].label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;