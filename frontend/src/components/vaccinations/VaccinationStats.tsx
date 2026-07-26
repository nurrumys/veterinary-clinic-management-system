import {
  Syringe,
  Clock3,
  CalendarClock,
  PawPrint,
} from "lucide-react";

import type { Vaccination } from "../../types/vaccination";

type VaccinationStatsProps = {
  vaccinations: Vaccination[];
};

function VaccinationStats({
  vaccinations,
}: VaccinationStatsProps) {
  const today = new Date().toISOString().split("T")[0];

  const totalVaccinations = vaccinations.length;

  const administeredToday = vaccinations.filter(
    (vaccination) =>
      vaccination.administeredAt.startsWith(today)
  ).length;

  const upcomingDue = vaccinations.filter(
    (vaccination) =>
      new Date(vaccination.nextDueDate) > new Date()
  ).length;

  const vaccinatedPets = new Set(
    vaccinations.map(
      (vaccination) => vaccination.petId
    )
  ).size;

  const stats = [
    {
      title: "Total Vaccinations",
      value: totalVaccinations,
      subtitle: "Recorded vaccinations",
      icon: Syringe,
      iconBackground: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      title: "Administered Today",
      value: administeredToday,
      subtitle: "Completed today",
      icon: Clock3,
      iconBackground: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Upcoming Due",
      value: upcomingDue,
      subtitle: "Scheduled boosters",
      icon: CalendarClock,
      iconBackground: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      title: "Vaccinated Pets",
      value: vaccinatedPets,
      subtitle: "Unique patients",
      icon: PawPrint,
      iconBackground: "bg-violet-100",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-slate-900">
                  {stat.value}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {stat.subtitle}
                </p>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.iconBackground}`}
              >
                <Icon
                  size={28}
                  className={stat.iconColor}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VaccinationStats;