import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageContainer from "../../components/layout/PageContainer";
import Modal from "../../components/ui/Modal";

import InvoiceStats from "../../components/invoices/InvoiceStats";
import InvoiceToolbar from "../../components/invoices/InvoiceToolbar";
import InvoiceTable from "../../components/invoices/InvoiceTable";
import InvoiceForm from "../../components/invoices/InvoiceForm";
import InvoiceDetailsDialog from "../../components/invoices/InvoiceDetailsDialog";

import {
  getInvoices,
  createInvoice,
  sendInvoice,
  markInvoicePaid,
} from "../../services/invoiceService";

import type {
  Invoice,
  InvoiceStatus,
  CreateInvoiceRequest,
} from "../../types/invoice";

function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState<InvoiceStatus | "">("");

  const [from, setFrom] =
    useState("");

  const [to, setTo] =
    useState("");

  const [sort, setSort] =
    useState("issuedAt,desc");

  const [page, setPage] =
    useState(0);

  const size = 20;

  const [totalPages, setTotalPages] =
    useState(0);

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [isDetailsOpen, setIsDetailsOpen] =
    useState(false);

  const [
    selectedInvoice,
    setSelectedInvoice,
  ] = useState<Invoice | null>(null);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getInvoices({
        page,
        size,
        sort,
        status: status || undefined,
        from: from || undefined,
        to: to || undefined,
      });

      setInvoices(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
      setError("Failed to load invoices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [
    page,
    status,
    from,
    to,
    sort,
  ]);
    const filteredInvoices = invoices.filter((invoice) => {
    if (!search.trim()) {
      return true;
    }

    const keyword = search.toLowerCase();

    return (
      invoice.id.toString().includes(keyword) ||
      invoice.visitId.toString().includes(keyword) ||
      invoice.status.toLowerCase().includes(keyword)
    );
  });

  const handleCreateInvoice = () => {
    setSelectedInvoice(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedInvoice(null);
    setIsDetailsOpen(false);
  };

  const handleSubmitInvoice = async (
    values: CreateInvoiceRequest
  ) => {
    try {
      await createInvoice(values);

      setIsFormOpen(false);

      await fetchInvoices();
    } catch (error) {
      console.error("Failed to create invoice:", error);
    }
  };

  const handleSendInvoice = async (
    invoice: Invoice
  ) => {
    try {
      await sendInvoice(invoice.id);

      await fetchInvoices();
    } catch (error) {
      console.error("Failed to send invoice:", error);
    }
  };

  const handleMarkPaid = async (
    invoice: Invoice
  ) => {
    try {
      await markInvoicePaid(invoice.id);

      await fetchInvoices();
    } catch (error) {
      console.error("Failed to mark invoice as paid:", error);
    }
  };

  const handleExportInvoices = () => {
    const headers = [
      "Invoice ID",
      "Visit ID",
      "Issued At",
      "Status",
      "Subtotal",
      "VAT",
      "Total",
    ];

    const rows = filteredInvoices.map((invoice) => [
      invoice.id,
      invoice.visitId,
      invoice.issuedAt,
      invoice.status,
      invoice.subtotal,
      invoice.vatAmount,
      invoice.total,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "invoices.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };
    return (
    <DashboardLayout>
      <PageContainer>
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-slate-900">
      Invoices
    </h1>

    <p className="mt-2 text-slate-500">
      Manage clinic invoices and billing.
    </p>
  </div>
        <InvoiceStats invoices={invoices} />

        <div className="mt-8">
          <InvoiceToolbar
            search={search}
            status={status}
            from={from}
            to={to}
            sort={sort}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onFromChange={setFrom}
            onToChange={setTo}
            onSortChange={setSort}
            onExport={handleExportInvoices}
            onCreate={handleCreateInvoice}
          />
        </div>

        {loading ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            Loading invoices...
          </div>
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-600">
            {error}
          </div>
        ) : (
          <>
            <InvoiceTable
              invoices={filteredInvoices}
              onView={handleViewInvoice}
              onSend={handleSendInvoice}
              onMarkPaid={handleMarkPaid}
            />

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={page === 0}
                  onClick={() => setPage((previous) => previous - 1)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-sm text-slate-600">
                  Page {page + 1} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={page + 1 >= totalPages}
                  onClick={() => setPage((previous) => previous + 1)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
                <Modal
  open={isFormOpen}
  title="Create Invoice"
  onClose={handleCloseForm}
  maxWidth="2xl"
>
          <InvoiceForm
            mode="create"
            onSubmit={handleSubmitInvoice}
            onCancel={handleCloseForm}
          />
        </Modal>

        <InvoiceDetailsDialog
          open={isDetailsOpen}
          invoice={selectedInvoice}
          onClose={handleCloseDetails}
        />
      </PageContainer>
    </DashboardLayout>
  );
}

export default InvoicesPage;