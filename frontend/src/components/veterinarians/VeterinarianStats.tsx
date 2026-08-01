import {
  Stethoscope,
  UserCheck,
  BriefcaseMedical,
  UserPlus,
} from "lucide-react";

import StatsCard from "../dashboard/StatsCard";

import type {
  VeterinarianStatsResponse,
} from "../../types/veterinarian";


type VeterinarianStatsProps = {
  stats: VeterinarianStatsResponse;
};


function VeterinarianStats({
  stats,
}: VeterinarianStatsProps) {


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
        title="Total Veterinarians"
        value={stats.totalVets}
        subtitle="Registered veterinarians"
        icon={Stethoscope}
        iconColor="text-blue-600"
        iconBackground="bg-blue-100"
      />


      <StatsCard
        title="Available Doctors"
        value={stats.availableDoctors}
        subtitle="Currently active"
        icon={UserCheck}
        iconColor="text-emerald-600"
        iconBackground="bg-emerald-100"
      />


      <StatsCard
        title="Specialties"
        value={stats.specialties}
        subtitle="Different fields"
        icon={BriefcaseMedical}
        iconColor="text-violet-600"
        iconBackground="bg-violet-100"
      />


      <StatsCard
        title="New This Month"
        value={stats.newThisMonth}
        subtitle="Recently joined"
        icon={UserPlus}
        iconColor="text-cyan-600"
        iconBackground="bg-cyan-100"
      />


    </div>

  );
}


export default VeterinarianStats;