import {
  Receipt,
  Clock3,
  Send,
  CircleDollarSign,
} from "lucide-react";

import StatsCard from "../dashboard/StatsCard";

import type {
  InvoiceStats as InvoiceStatsType,
} from "../../types/invoice";


type InvoiceStatsProps = {
  stats: InvoiceStatsType;
};


function InvoiceStats({
  stats,
}: InvoiceStatsProps) {


  return (
    <div
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-4
      "
    >

      <StatsCard
        title="Total Invoices"
        value={stats.totalInvoices}
        subtitle="Generated invoices"
        icon={Receipt}
        iconColor="text-cyan-600"
        iconBackground="bg-cyan-100"
      />


      <StatsCard
        title="Draft"
        value={stats.draft}
        subtitle="Pending review"
        icon={Clock3}
        iconColor="text-amber-600"
        iconBackground="bg-amber-100"
      />


      <StatsCard
        title="Sent"
        value={stats.sent}
        subtitle="Waiting payment"
        icon={Send}
        iconColor="text-blue-600"
        iconBackground="bg-blue-100"
      />


      <StatsCard
        title="Paid"
        value={stats.paid}
        subtitle="Completed payments"
        icon={CircleDollarSign}
        iconColor="text-emerald-600"
        iconBackground="bg-emerald-100"
      />

    </div>
  );
}


export default InvoiceStats;