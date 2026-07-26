import {
  Receipt,
  Clock3,
  Send,
  CircleDollarSign,
} from "lucide-react";

import StatsCard from "../dashboard/StatsCard";

import type { Invoice } from "../../types/invoice";

type InvoiceStatsProps = {
  invoices: Invoice[];
};

function InvoiceStats({
  invoices,
}: InvoiceStatsProps) {
  const totalInvoices = invoices.length;

  const draftInvoices = invoices.filter(
    (invoice) => invoice.status === "DRAFT"
  ).length;

  const sentInvoices = invoices.filter(
    (invoice) => invoice.status === "SENT"
  ).length;

  const paidInvoices = invoices.filter(
    (invoice) => invoice.status === "PAID"
  ).length;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Invoices"
        value={totalInvoices}
        subtitle="Generated invoices"
        icon={Receipt}
        iconColor="text-cyan-600"
        iconBackground="bg-cyan-100"
      />

      <StatsCard
        title="Draft"
        value={draftInvoices}
        subtitle="Pending review"
        icon={Clock3}
        iconColor="text-amber-600"
        iconBackground="bg-amber-100"
      />

      <StatsCard
        title="Sent"
        value={sentInvoices}
        subtitle="Waiting payment"
        icon={Send}
        iconColor="text-blue-600"
        iconBackground="bg-blue-100"
      />

      <StatsCard
        title="Paid"
        value={paidInvoices}
        subtitle="Completed payments"
        icon={CircleDollarSign}
        iconColor="text-emerald-600"
        iconBackground="bg-emerald-100"
      />
    </div>
  );
}

export default InvoiceStats;