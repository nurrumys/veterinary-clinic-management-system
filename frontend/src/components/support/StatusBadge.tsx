import type { SupportRequestStatus } from "../../types/support";

type StatusBadgeProps = {
  status: SupportRequestStatus;
};

function StatusBadge({
  status,
}: StatusBadgeProps) {
  const config = {
    OPEN: {
      label: "Open",
      className: "bg-green-100 text-green-700",
    },
    IN_PROGRESS: {
      label: "In Progress",
      className: "bg-amber-100 text-amber-700",
    },
    RESOLVED: {
      label: "Resolved",
      className: "bg-blue-100 text-blue-700",
    },
  }[status];

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
}

export default StatusBadge;