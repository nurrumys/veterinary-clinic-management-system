import {
  PawPrint,
  Stethoscope,
  CalendarDays,
  Wallet,
} from "lucide-react";

import StatsCard from "./StatsCard";
import { dashboardStats } from "../../mocks/dashboard";

function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Active Patients"
        value={dashboardStats.activePatients}
        subtitle="+12 New Patients"
        icon={PawPrint}
        iconColor="text-violet-600"
        iconBackground="bg-violet-100"
      />

      <StatsCard
        title="Veterinarians"
        value={dashboardStats.veterinarians}
        subtitle="2 On Duty"
        icon={Stethoscope}
        iconColor="text-blue-600"
        iconBackground="bg-blue-100"
      />

      <StatsCard
        title="Appointments"
        value={dashboardStats.todayAppointments}
        subtitle="Scheduled Today"
        icon={CalendarDays}
        iconColor="text-green-600"
        iconBackground="bg-green-100"
      />

      <StatsCard
        title="Revenue"
        value={dashboardStats.unpaidInvoices}
        subtitle="This Month"
        icon={Wallet}
        iconColor="text-orange-600"
        iconBackground="bg-orange-100"
      />
    </div>
  );
}

export default DashboardStats;