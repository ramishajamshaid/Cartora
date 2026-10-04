const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-text-secondary">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs text-text-secondary mb-1">
          {label}
        </p>

        <p className="text-sm text-text-primary wrap-break-word">
          {value || "-"}
        </p>
      </div>
    </div>
  );
};

export default InfoItem;