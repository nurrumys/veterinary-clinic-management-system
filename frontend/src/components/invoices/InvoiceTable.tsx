import Card from "../ui/Card";

import InvoiceRow from "./InvoiceRow";

import type { Invoice } from "../../types/invoice";

type InvoiceTableProps = {
  invoices: Invoice[];

  selectedInvoices: number[];

  onSelect: (
    invoiceId: number,
    checked: boolean
  ) => void;

  onSelectAll: (
    checked: boolean
  ) => void;

  onView: (invoice: Invoice) => void;
  onSend: (invoice: Invoice) => void;
  onMarkPaid: (invoice: Invoice) => void;
};

function InvoiceTable({
  invoices,
  selectedInvoices,
  onSelect,
  onSelectAll,
  onView,
  onSend,
  onMarkPaid,
}: InvoiceTableProps) {
  const allSelected =
    invoices.length > 0 &&
    invoices.every((invoice) =>
      selectedInvoices.includes(invoice.id)
    );

  return (
    <Card
      className="
        mt-8
        overflow-hidden
        p-0
      "
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr
              className="
                border-b
                border-slate-200
                bg-slate-50
              "
            >
              <th className="px-4 py-5">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) =>
                    onSelectAll(e.target.checked)
                  }
                />
              </th>

              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Invoice
              </th>

              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Visit
              </th>

              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Issued
              </th>

              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Total
              </th>

              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="
                    px-8
                    py-12
                    text-center
                    text-slate-500
                  "
                >
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <InvoiceRow
                  key={invoice.id}
                  invoice={invoice}
                  selected={selectedInvoices.includes(
                    invoice.id
                  )}
                  onSelect={onSelect}
                  onView={onView}
                  onSend={onSend}
                  onMarkPaid={onMarkPaid}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default InvoiceTable;