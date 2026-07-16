import {
  PawPrint,
  Dog,
  Cat,
  PlusCircle,
} from "lucide-react";

import StatsCard from "../dashboard/StatsCard";


function PetStats() {
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
        value={421}
        subtitle="+18 this month"
        icon={PawPrint}
        iconColor="text-blue-600"
        iconBackground="bg-blue-100"
      />


      <StatsCard
        title="Dogs"
        value={248}
        subtitle="58.9% of all pets"
        icon={Dog}
        iconColor="text-amber-600"
        iconBackground="bg-amber-100"
      />


      <StatsCard
        title="Cats"
        value={151}
        subtitle="35.9% of all pets"
        icon={Cat}
        iconColor="text-violet-600"
        iconBackground="bg-violet-100"
      />


      <StatsCard
        title="New This Month"
        value={18}
        subtitle="Recently registered"
        icon={PlusCircle}
        iconColor="text-emerald-600"
        iconBackground="bg-emerald-100"
      />


    </div>
  );
}


export default PetStats;