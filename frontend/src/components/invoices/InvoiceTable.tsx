import Card from "../ui/Card";

import InvoiceRow from "./InvoiceRow";

import type { Invoice } from "../../types/invoice";

type InvoiceTableProps = {
  invoices: Invoice[];

  onView: (invoice: Invoice) => void;
  onSend: (invoice: Invoice) => void;
  onMarkPaid: (invoice: Invoice) => void;
};

function InvoiceTable({
  invoices,
  onView,
  onSend,
  onMarkPaid,
}: InvoiceTableProps) {
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
                  colSpan={6}
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