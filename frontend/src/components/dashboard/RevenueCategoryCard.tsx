import Card from "../ui/Card";
import RevenueCategoryChart from "../charts/RevenueCategoryChart";

import type {
  DashboardSummary,
  RevenueCategory,
} from "../../types/dashboard";

type RevenueCategoryCardProps = {
  summary: DashboardSummary;
};

const categoryLabels: Record<RevenueCategory, string> = {
  CONSULTATION: "Consultation",
  VACCINATION: "Vaccination",
  SURGERY: "Surgery",
  HOSPITAL: "Hospital Services",
  OTHER: "Other",
};

function RevenueCategoryCard({
  summary,
}: RevenueCategoryCardProps) {
  const chartData = summary.revenueByCategory.map(
    (item) => ({
      category:
        categoryLabels[item.category] ??
        item.category,
      amount: item.amount,
    })
  );

  return (
    <Card className="h-full">
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Revenue by Category
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Revenue distribution by service category
        </p>
      </div>

      {/* Chart */}

      <div className="h-[320px]">
        <RevenueCategoryChart
          data={chartData}
        />
      </div>
    </Card>
  );
}

export default RevenueCategoryCard;