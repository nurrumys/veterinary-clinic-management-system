import Card from "../ui/Card";
import AppointmentTrendChart from "../charts/AppointmentTrendChart";

import type { DashboardSummary } from "../../types/dashboard";

type AppointmentStatisticsProps = {
  summary: DashboardSummary;
};

function AppointmentStatistics({
  summary,
}: AppointmentStatisticsProps) {
  const chartData = summary.appointmentTrend30Days.map(
    (item) => ({
      date: item.date,
      count: item.count,
    })
  );

  return (
    <Card className="h-full">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Appointment Statistics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Appointment trend for the last 30 days
          </p>
        </div>

        <button
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            px-5
            py-2
            text-sm
            font-medium
            text-slate-600
            transition-all
            duration-200
            hover:bg-slate-50
          "
        >
          Last 30 Days
        </button>
      </div>

      {/* Chart */}

      <div className="mt-4 h-[320px]">
        <AppointmentTrendChart
          data={chartData}
        />
      </div>
    </Card>
  );
}

export default AppointmentStatistics;