import {
  CheckCircle2,
  Eye,
  Send,
} from "lucide-react";

import type { Invoice } from "../../types/invoice";

type InvoiceActionsProps = {
  invoice: Invoice;
  onView: (invoice: Invoice) => void;
  onSend: (invoice: Invoice) => void;
  onMarkPaid: (invoice: Invoice) => void;
};

function InvoiceActions({
  invoice,
  onView,
  onSend,
  onMarkPaid,
}: InvoiceActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onView(invoice)}
        className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        title="View Invoice"
      >
        <Eye size={18} />
      </button>

      {invoice.status === "DRAFT" && (
        <button
          type="button"
          onClick={() => onSend(invoice)}
          className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
          title="Send Invoice"
        >
          <Send size={18} />
        </button>
      )}

      {invoice.status === "SENT" && (
        <button
          type="button"
          onClick={() => onMarkPaid(invoice)}
          className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50"
          title="Mark as Paid"
        >
          <CheckCircle2 size={18} />
        </button>
      )}
    </div>
  );
}

export default InvoiceActions;