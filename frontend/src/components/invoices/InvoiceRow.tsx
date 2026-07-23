import InvoiceActions from "./InvoiceActions";
import InvoiceStatusBadge from "./InvoiceStatusBadge";

import type { Invoice } from "../../types/invoice";

import {
  formatCurrency,
} from "../../utils/format";

import {
  formatDate,
} from "../../utils/date";

type InvoiceRowProps = {
  invoice: Invoice;

  onView: (invoice: Invoice) => void;
  onSend: (invoice: Invoice) => void;
  onMarkPaid: (invoice: Invoice) => void;
};

function InvoiceRow({
  invoice,
  onView,
  onSend,
  onMarkPaid,
}: InvoiceRowProps) {
  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      <td className="px-8 py-5 font-semibold text-slate-900">
        #{invoice.id}
      </td>

      <td className="px-8 py-5 text-slate-600">
        #{invoice.visitId}
      </td>

      <td className="px-8 py-5 text-slate-600">
        {formatDate(invoice.issuedAt)}
      </td>

      <td className="px-8 py-5 font-semibold text-slate-900">
        {formatCurrency(invoice.total)}
      </td>

      <td className="px-8 py-5">
        <InvoiceStatusBadge status={invoice.status} />
      </td>

      <td className="px-8 py-5">
        <InvoiceActions
          invoice={invoice}
          onView={onView}
          onSend={onSend}
          onMarkPaid={onMarkPaid}
        />
      </td>
    </tr>
  );
}

export default InvoiceRow;