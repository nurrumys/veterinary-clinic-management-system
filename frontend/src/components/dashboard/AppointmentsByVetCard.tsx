import Card from "../ui/Card";
import AppointmentsByVetChart from "../charts/AppointmentsByVetChart";

import type { DashboardSummary } from "../../types/dashboard";

type AppointmentsByVetCardProps = {
  summary: DashboardSummary;
};

function AppointmentsByVetCard({
  summary,
}: AppointmentsByVetCardProps) {
  const chartData =
    summary.appointmentsByVet.map((item) => ({
      vetName: item.vetName,
      count: item.count,
    }));

  return (
    <Card className="h-full">
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Appointments by Veterinarian
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Number of appointments assigned to each veterinarian
        </p>
      </div>

      {/* Chart */}

      <div className="h-[320px]">
        <AppointmentsByVetChart
          data={chartData}
        />
      </div>
    </Card>
  );
}

export default AppointmentsByVetCard;