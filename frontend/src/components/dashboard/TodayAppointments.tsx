import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";

import type { DashboardSummary } from "../../types/dashboard";

type TodayAppointmentsProps = {
  summary: DashboardSummary;
};

function getStatusStyle(status: string) {
  switch (status) {
    case "SCHEDULED":
      return "bg-purple-100 text-purple-700";

    case "COMPLETED":
      return "bg-green-100 text-green-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function formatStatus(status: string) {
  switch (status) {
    case "SCHEDULED":
      return "Scheduled";

    case "COMPLETED":
      return "Completed";

    case "CANCELLED":
      return "Cancelled";

    default:
      return status;
  }
}

function TodayAppointments({
  summary,
}: TodayAppointmentsProps) {
  const navigate = useNavigate();

  return (
    <Card className="h-full">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Today's Appointments
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Today's scheduled appointments
          </p>
        </div>

        <button
          onClick={() => navigate("/appointments")}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          View All
        </button>
      </div>

      {/* Appointment List */}

      {summary.todaySchedule.length === 0 ? (
        <div className="flex h-52 items-center justify-center rounded-2xl border border-dashed border-slate-200">
          <p className="text-sm text-slate-500">
            No appointments scheduled for today.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {summary.todaySchedule.slice(0, 3).map((appointment) => (
            <div
              key={appointment.visitId}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 transition-all duration-200 hover:border-cyan-300 hover:bg-slate-50"
            >
              {/* Time */}

              <div className="flex-[0.8]">
                <p className="text-lg font-semibold text-slate-900">
                  {new Date(appointment.scheduledAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Pet */}

              <div className="flex-[2]">
                <h3 className="text-base font-semibold text-slate-900">
                  {appointment.petName}
                </h3>
              </div>

              {/* Veterinarian */}

              <div className="flex-[2]">
                <p className="truncate text-sm text-slate-700">
                  {appointment.vetName}
                </p>
              </div>

              {/* Status */}

              <div className="flex flex-[1] justify-end">
                <span
                  className={`inline-flex min-w-[110px] items-center justify-center rounded-full px-3 py-2 text-xs font-semibold whitespace-nowrap ${getStatusStyle(
                    appointment.status
                  )}`}
                >
                  {formatStatus(appointment.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default TodayAppointments;