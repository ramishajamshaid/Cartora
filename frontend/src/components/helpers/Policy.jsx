function Policy({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">{label}</span>

      <span className="rounded bg-[#F6F3F2] px-2 py-1 text-xs font-semibold text-[#171717]">
        {value}
      </span>
    </div>
  );
}

export default Policy;