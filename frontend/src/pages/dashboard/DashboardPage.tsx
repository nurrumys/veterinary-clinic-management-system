import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardStats from "../../components/dashboard/DashboardStats";
import AppointmentStatistics from "../../components/dashboard/AppointmentStatistics";
import QuickActions from "../../components/dashboard/QuickActions";
import TodayAppointments from "../../components/dashboard/TodayAppointments";
import RecentActivity from "../../components/dashboard/RecentActivity";

function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-5xl font-bold text-slate-900">
          Dashboard
        </h1>

        <h2 className="mt-2 text-2xl font-semibold text-slate-700">
          Welcome back, Admin
        </h2>

        <p className="mt-2 text-slate-500">
          Here's what's happening in your veterinary clinic today.
        </p>
      </div>

      {/* Statistics */}

      <DashboardStats />

      {/* Appointment Statistics + Quick Actions */}

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">

        <div className="xl:col-span-8">
          <AppointmentStatistics />
        </div>

        <div className="xl:col-span-4">
          <QuickActions />
        </div>

      </div>

      {/* Today's Appointments + Recent Activity */}

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">

        <div className="xl:col-span-8">
          <TodayAppointments />
        </div>

        <div className="xl:col-span-4">
          <RecentActivity />
        </div>

      </div>

    </DashboardLayout>
  );
}

export default DashboardPage;