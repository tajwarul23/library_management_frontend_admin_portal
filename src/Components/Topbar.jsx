const Topbar = ({ title }) => {
  return (
    <div className="h-12 bg-navy-card border-b border-navy-border flex items-center justify-between px-5 shrink-0">
      <span className="text-sm font-medium text-text-base">{title}</span>
      <div className="flex items-center gap-3">
        <span className="text-xs text-text-muted">Admin</span>
        <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-xs font-medium text-navy">
          A
        </div>
      </div>
    </div>
  );
};

export default Topbar;