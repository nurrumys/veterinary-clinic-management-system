import {
  PawPrint,
  UserPlus,
  Users,
} from "lucide-react";

import StatsCard from "../dashboard/StatsCard";

import type { OwnerStatsResponse } from "../../types/owner";

type OwnerStatsProps = {
  stats: OwnerStatsResponse;
};

function OwnerStats({
  stats,
}: OwnerStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <StatsCard
        title="Total Owners"
        value={stats.totalOwners}
        subtitle="Registered owners"
        icon={Users}
        iconColor="text-blue-600"
        iconBackground="bg-blue-100"
      />

      <StatsCard
        title="Registered Pets"
        value={stats.totalPets}
        subtitle="Linked to owners"
        icon={PawPrint}
        iconColor="text-violet-600"
        iconBackground="bg-violet-100"
      />

      <StatsCard
        title="New This Month"
        value={stats.newOwnersThisMonth}
        subtitle="Recently added"
        icon={UserPlus}
        iconColor="text-orange-600"
        iconBackground="bg-orange-100"
      />
    </div>
  );
}

export default OwnerStats;