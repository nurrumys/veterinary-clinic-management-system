import { Download, Plus, Search } from "lucide-react";

import type { InvoiceStatus } from "../../types/invoice";

type InvoiceToolbarProps = {
  search: string;
  status: InvoiceStatus | "";
  from: string;
  to: string;
  sort: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: InvoiceStatus | "") => void;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onSortChange: (value: string) => void;

  onExport: () => void;
  onCreate: () => void;
};

function InvoiceToolbar({
  search,
  status,
  from,
  to,
  sort,
  onSearchChange,
  onStatusChange,
  onFromChange,
  onToChange,
  onSortChange,
  onExport,
  onCreate,
}: InvoiceToolbarProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-5">
        {/* Top Row */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative min-w-[320px] flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              placeholder="Search invoices..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500"
            />
          </div>

          <input
            type="date"
            value={from}
            onChange={(e) => onFromChange(e.target.value)}
            className="w-[170px] rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          <input
            type="date"
            value={to}
            onChange={(e) => onToChange(e.target.value)}
            className="w-[170px] rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={status}
              onChange={(e) =>
                onStatusChange(e.target.value as InvoiceStatus | "")
              }
              className="w-[180px] rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="SENT">Sent</option>
              <option value="PAID">Paid</option>
            </select>

            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-[220px] rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              <option value="issuedAt,desc">Newest First</option>
              <option value="issuedAt,asc">Oldest First</option>
              <option value="total,desc">Highest Total</option>
              <option value="total,asc">Lowest Total</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExport}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Download size={18} />
              Export
            </button>

            <button
              type="button"
              onClick={onCreate}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Create Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceToolbar;