import { Eye } from "lucide-react";

import StatusBadge from "./StatusBadge";

import type { SupportRequest } from "../../types/support";

type SupportRowProps = {
  support: SupportRequest;
  onView: (support: SupportRequest) => void;
};

function SupportRow({
  support,
  onView,
}: SupportRowProps) {
  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">
      <td className="px-6 py-4">
        <p className="font-medium text-slate-900">
          {support.subject}
        </p>
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={support.status} />
      </td>

      <td className="px-6 py-4 text-sm text-slate-600">
        {new Date(support.createdAt).toLocaleDateString("en-GB")}
      </td>

      <td className="px-6 py-4 text-sm text-slate-600">
        {new Date(support.updatedAt).toLocaleDateString("en-GB")}
      </td>

      <td className="px-6 py-4">
        <button
          type="button"
          aria-label="View support request"
          onClick={() => onView(support)}
          className="
            inline-flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            transition-colors
            hover:bg-slate-100
          "
        >
          <Eye size={18} />
        </button>
      </td>
    </tr>
  );
}

export default SupportRow;