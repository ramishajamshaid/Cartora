function Metric({ icon, label, value, sub }) {
  return (
    <div className="mb-3 flex items-center justify-between rounded-lg bg-[#F6F3F2] p-3">
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F3E8DF] text-[#954518]">
          {icon}
        </div>

        <span className="text-sm text-[#171717]">
          {label}
        </span>
      </div>

      <div className="text-right">
        <p className="text-sm font-semibold text-[#171717]">
          {value}
        </p>

        <p className="text-xs text-gray-500">
          {sub}
        </p>
      </div>
    </div>
  );
}

export default Metric;