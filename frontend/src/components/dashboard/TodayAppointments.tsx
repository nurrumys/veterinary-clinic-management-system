import Card from "../ui/Card";
import { todayAppointments } from "../../mocks/dashboard";

function getStatusStyle(status: string) {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "In Progress":
      return "bg-blue-100 text-blue-700";
    case "Scheduled":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function TodayAppointments() {
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

        <button className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50">
          View All
        </button>
      </div>

      {/* Appointment List */}

      <div className="space-y-3">
        {todayAppointments.slice(0, 3).map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 transition-all duration-200 hover:border-cyan-300 hover:bg-slate-50"
          >
            {/* Time */}

            <div className="flex-[0.8]">
              <p className="text-lg font-semibold text-slate-900">
                {appointment.time}
              </p>
            </div>

            {/* Pet */}

            <div className="flex-[1.8]">
              <h3 className="text-base font-semibold text-slate-900">
                {appointment.pet}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Owner: {appointment.owner}
              </p>
            </div>

            {/* Service */}

            <div className="flex-[1.8]">
              <p className="text-sm font-medium text-slate-700">
                {appointment.service}
              </p>
            </div>

            {/* Veterinarian */}

            <div className="flex-[2]">
              <p className="truncate text-sm text-slate-700">
                {appointment.veterinarian}
              </p>
            </div>

            {/* Status */}

            <div className="flex justify-end flex-[1]">
              <span
                className={`inline-flex min-w-[100px] items-center justify-center rounded-full px-3 py-2 text-xs font-semibold whitespace-nowrap ${getStatusStyle(
                  appointment.status
                )}`}
              >
                {appointment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default TodayAppointments;