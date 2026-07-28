import type { SupportRequestStatus } from "../../types/support";

type StatusBadgeProps = {
  status: SupportRequestStatus;
};

function StatusBadge({
  status,
}: StatusBadgeProps) {
  switch (status) {
    case "OPEN":
      return (
        <span
          className="
            inline-flex
            items-center
            rounded-full
            bg-green-100
            px-3
            py-1
            text-xs
            font-semibold
            text-green-700
          "
        >
          Open
        </span>
      );

    case "IN_PROGRESS":
      return (
        <span
          className="
            inline-flex
            items-center
            rounded-full
            bg-amber-100
            px-3
            py-1
            text-xs
            font-semibold
            text-amber-700
          "
        >
          In Progress
        </span>
      );

    case "RESOLVED":
      return (
        <span
          className="
            inline-flex
            items-center
            rounded-full
            bg-blue-100
            px-3
            py-1
            text-xs
            font-semibold
            text-blue-700
          "
        >
          Resolved
        </span>
      );

    default:
      return null;
  }
}

export default StatusBadge;