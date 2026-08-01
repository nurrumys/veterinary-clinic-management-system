import {
  PawPrint,
  Dog,
  Cat,
  PlusCircle,
} from "lucide-react";

import StatsCard from "../dashboard/StatsCard";

import type {
  PetStatsResponse,
} from "../../types/pet";

type PetStatsProps = {
  stats: PetStatsResponse;
};

function PetStats({
  stats,
}: PetStatsProps) {
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
        title="Total Pets"
        value={stats.totalPets}
        subtitle="Registered pets"
        icon={PawPrint}
        iconColor="text-blue-600"
        iconBackground="bg-blue-100"
      />

      <StatsCard
        title="Dogs"
        value={stats.dogs}
        subtitle="Registered dogs"
        icon={Dog}
        iconColor="text-amber-600"
        iconBackground="bg-amber-100"
      />

      <StatsCard
        title="Cats"
        value={stats.cats}
        subtitle="Registered cats"
        icon={Cat}
        iconColor="text-violet-600"
        iconBackground="bg-violet-100"
      />

      <StatsCard
        title="New This Month"
        value={stats.newThisMonth}
        subtitle="Recently registered"
        icon={PlusCircle}
        iconColor="text-emerald-600"
        iconBackground="bg-emerald-100"
      />
    </div>
  );
}

export default PetStats;