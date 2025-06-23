const StatusChip = ({ enabled: active }: { enabled: boolean }) => {
  const activeClasses = `bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`;
  const inactiveClasses = `bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`;

  return <span className={active ? activeClasses : inactiveClasses}>{active ? "Active" : "Inactive"}</span>;
};

export default StatusChip;
