import {
  Stethoscope,
  UserCheck,
  BriefcaseMedical,
  UserPlus,
} from "lucide-react";

import StatsCard from "../dashboard/StatsCard";


function VeterinarianStats() {

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

        value={18}

        subtitle="+2 this month"

        icon={Stethoscope}

        iconColor="text-blue-600"

        iconBackground="bg-blue-100"

      />



      <StatsCard

        title="Available Doctors"

        value={15}

        subtitle="Currently active"

        icon={UserCheck}

        iconColor="text-emerald-600"

        iconBackground="bg-emerald-100"

      />



      <StatsCard

        title="Specialties"

        value={6}

        subtitle="Different fields"

        icon={BriefcaseMedical}

        iconColor="text-violet-600"

        iconBackground="bg-violet-100"

      />



      <StatsCard

        title="New This Month"

        value={2}

        subtitle="Recently joined"

        icon={UserPlus}

        iconColor="text-cyan-600"

        iconBackground="bg-cyan-100"

      />


    </div>

  );
}


export default VeterinarianStats;