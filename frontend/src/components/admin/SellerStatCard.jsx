function SellerStatCard({
  title,
  value,
  description,
  warning,
  danger,
}) {
  return (
    <div className="bg-surface rounded-xl p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
        {title}
      </p>

      <div className="flex items-end justify-between mt-3">
        <span className="text-3xl font-semibold text-text-primary">
          {value}
        </span>

        <span
          className={`text-xs font-medium ${
            warning
              ? "text-warning"
              : danger
              ? "text-error"
              : "text-text-secondary"
          }`}
        >
          {description}
        </span>
      </div>
    </div>
  );
}

export default SellerStatCard;