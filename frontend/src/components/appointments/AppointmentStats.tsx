import {
  CalendarDays,
  Clock3,
  CircleCheck,
  CircleX,
} from "lucide-react";

import StatsCard from "../dashboard/StatsCard";

import type { Visit } from "../../types/visit";

type AppointmentStatsProps = {
  appointments?: Visit[];
};

function AppointmentStats({
  appointments = [],
}: AppointmentStatsProps) {

  const totalAppointments =
    appointments.length;

  const scheduledAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "SCHEDULED"
    ).length;

  const completedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "COMPLETED"
    ).length;

  const cancelledAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "CANCELLED"
    ).length;

  return (

    <div
      className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
        xl:grid-cols-4
      "
    >

      <StatsCard
        title="Total Appointments"
        value={totalAppointments}
        subtitle="All scheduled visits"
        icon={CalendarDays}
        iconColor="text-blue-600"
        iconBackground="bg-blue-100"
      />

      <StatsCard
        title="Scheduled"
        value={scheduledAppointments}
        subtitle="Upcoming visits"
        icon={Clock3}
        iconColor="text-amber-600"
        iconBackground="bg-amber-100"
      />

      <StatsCard
        title="Completed"
        value={completedAppointments}
        subtitle="Finished appointments"
        icon={CircleCheck}
        iconColor="text-emerald-600"
        iconBackground="bg-emerald-100"
      />

      <StatsCard
        title="Cancelled"
        value={cancelledAppointments}
        subtitle="Cancelled visits"
        icon={CircleX}
        iconColor="text-red-600"
        iconBackground="bg-red-100"
      />

    </div>

  );

}

export default AppointmentStats;