const StatCard = ({ label, value, delta, color }) => {
  return (
    <div className="bg-navy-card border border-navy-border rounded-lg p-3">
      <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1.5">{label}</p>
      <p className="text-2xl font-medium leading-none mb-1" style={{ color }}>{value}</p>
      <p className="text-[10px] text-text-muted">{delta}</p>
    </div>
  );
};

export default StatCard;