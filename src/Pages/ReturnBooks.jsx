const ReturnBook = () => {
  return (
    <div className="bg-navy-card border border-navy-border rounded-lg overflow-hidden max-w-md">
      <div className="px-3.5 py-2.5 border-b border-navy-border">
        <p className="text-[10px] text-text-muted uppercase tracking-wide">Return a Book</p>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div>
          <label className="text-[10px] text-text-muted block mb-1">Issue ID</label>
          <input
            className="w-full bg-navy-elevated border border-navy-border text-text-base text-xs px-3 py-2 rounded outline-none focus:ring-1 focus:ring-gold"
            placeholder="e.g. ISS-001"
          />
        </div>
        <button className="self-start bg-gold text-navy text-xs font-medium px-5 py-2 rounded">
          Process Return
        </button>
      </div>
    </div>
  );
};

export default ReturnBook;