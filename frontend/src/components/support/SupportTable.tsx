import SupportRow from "./SupportRow";

import type { SupportRequest } from "../../types/support";

type SupportTableProps = {
  supports: SupportRequest[];
  onView: (support: SupportRequest) => void;
};

function SupportTable({
  supports,
  onView,
}: SupportTableProps) {
  if (supports.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[320px]
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-slate-200
          bg-white
          text-center
        "
      >
        <h3 className="text-lg font-semibold text-slate-900">
          No support requests
        </h3>

        <p className="mt-2 max-w-sm text-sm text-slate-500">
          You haven't submitted any support requests yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        overflow-x-auto
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Subject
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Created
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Updated
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {supports.map((support) => (
            <SupportRow
              key={support.id}
              support={support}
              onView={onView}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupportTable;