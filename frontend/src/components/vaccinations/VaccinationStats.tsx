import {
  Syringe,
  Clock3,
  CalendarClock,
  PawPrint,
} from "lucide-react";

import StatsCard from "../dashboard/StatsCard";

import type {
  VaccinationStats as VaccinationStatsType,
} from "../../types/vaccination";


type VaccinationStatsProps = {
  stats: VaccinationStatsType;
};


function VaccinationStats({
  stats,
}: VaccinationStatsProps) {


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

        title="Total Vaccinations"

        value={stats.totalVaccinations}

        subtitle="Recorded vaccinations"

        icon={Syringe}

        iconColor="text-cyan-600"

        iconBackground="bg-cyan-100"

      />



      <StatsCard

        title="Administered Today"

        value={stats.administeredToday}

        subtitle="Completed today"

        icon={Clock3}

        iconColor="text-green-600"

        iconBackground="bg-green-100"

      />



      <StatsCard

        title="Upcoming Due"

        value={stats.upcomingDue}

        subtitle="Scheduled boosters"

        icon={CalendarClock}

        iconColor="text-amber-600"

        iconBackground="bg-amber-100"

      />



      <StatsCard

        title="Vaccinated Pets"

        value={stats.vaccinatedPets}

        subtitle="Unique patients"

        icon={PawPrint}

        iconColor="text-violet-600"

        iconBackground="bg-violet-100"

      />


    </div>

  );
}


export default VaccinationStats;