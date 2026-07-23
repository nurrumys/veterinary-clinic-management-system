import Card from "../ui/Card";
import CumulativeAppointmentsChart from "../charts/CumulativeAppointmentsChart";

import type { DashboardSummary } from "../../types/dashboard";

type CumulativeAppointmentsCardProps = {
  summary: DashboardSummary;
};

function CumulativeAppointmentsCard({
  summary,
}: CumulativeAppointmentsCardProps) {
  const chartData =
    summary.cumulativeAppointmentsYtd.map((item) => ({
      date: item.date,
      cumulativeCount: item.cumulativeCount,
    }));

  return (
    <Card className="h-full">
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Cumulative Appointments
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Year-to-date cumulative appointment growth
        </p>
      </div>

      {/* Chart */}

      <div className="h-[320px]">
        <CumulativeAppointmentsChart
          data={chartData}
        />
      </div>
    </Card>
  );
}

export default CumulativeAppointmentsCard;