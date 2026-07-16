import Card from "../ui/Card";
import AppointmentTrendChart from "../charts/AppointmentTrendChart";

import { appointmentTrendData } from "../../mocks/dashboard";

function AppointmentStatistics() {
  return (
    <Card className="h-full">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Appointment Statistics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Appointment trend for the last 7 days
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
          This Week
        </button>
      </div>

      {/* Chart */}

      <div className="mt-4 h-[320px]">
        <AppointmentTrendChart
          data={appointmentTrendData}
        />
      </div>
    </Card>
  );
}

export default AppointmentStatistics;