import {
  PawPrint,
  UserPlus,
  Users,
} from "lucide-react";

import StatsCard from "../dashboard/StatsCard";
import { ownerStats } from "../../mocks/owners";

function OwnerStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <StatsCard
        title="Total Owners"
        value={ownerStats.totalOwners}
        subtitle="+12 this month"
        icon={Users}
        iconColor="text-blue-600"
        iconBackground="bg-blue-100"
      />

      <StatsCard
        title="Registered Pets"
        value={ownerStats.totalPets}
        subtitle="Linked to owners"
        icon={PawPrint}
        iconColor="text-violet-600"
        iconBackground="bg-violet-100"
      />

      <StatsCard
        title="New This Month"
        value={ownerStats.newOwnersThisMonth}
        subtitle="Recently added"
        icon={UserPlus}
        iconColor="text-orange-600"
        iconBackground="bg-orange-100"
      />
    </div>
  );
}

export default OwnerStats;