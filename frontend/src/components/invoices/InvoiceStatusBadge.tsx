import type { InvoiceStatus } from "../../types/invoice";

type InvoiceStatusBadgeProps = {
  status: InvoiceStatus;
};

const statusStyles: Record<
  InvoiceStatus,
  {
    label: string;
    className: string;
  }
> = {
  DRAFT: {
    label: "Draft",
    className:
      "bg-amber-100 text-amber-700 border border-amber-200",
  },

  SENT: {
    label: "Sent",
    className:
      "bg-blue-100 text-blue-700 border border-blue-200",
  },

  PAID: {
    label: "Paid",
    className:
      "bg-emerald-100 text-emerald-700 border border-emerald-200",
  },
};

function InvoiceStatusBadge({
  status,
}: InvoiceStatusBadgeProps) {
  const badge = statusStyles[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}
    >
      {badge.label}
    </span>
  );
}

export default InvoiceStatusBadge;