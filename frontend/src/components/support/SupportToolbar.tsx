import { Plus } from "lucide-react";
import type { SupportRequestStatus } from "../../types/support";

type SupportToolbarProps = {
  onStatusChange: (value: SupportRequestStatus | "") => void;
  onAdd: () => void;
};

function SupportToolbar({
  onStatusChange,
  onAdd,
}: SupportToolbarProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div className="flex">
        <select
          defaultValue=""
          onChange={(e) =>
            onStatusChange(
              e.target.value as SupportRequestStatus | ""
            )
          }
          className="
            h-11
            min-w-[220px]
            rounded-xl
            border
            border-slate-200
            px-4
            text-sm
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        >
          <option value="">All Status</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="
          flex
          h-11
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-5
          text-sm
          font-medium
          text-white
          transition
          hover:bg-blue-700
          focus:outline-none
          focus:ring-2
          focus:ring-blue-200
        "
      >
        <Plus size={18} />
        New Request
      </button>
    </div>
  );
}

export default SupportToolbar;