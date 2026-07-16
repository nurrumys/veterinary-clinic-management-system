import {
  Calendar,
  HeartPulse,
  PawPrint,
  Scale,
  ShieldAlert,
  Stethoscope,
  VenusAndMars,
} from "lucide-react";

import Card from "../ui/Card";
import type { Pet } from "../../types/pet";

type PetMedicalExpandProps = {
  pet: Pet;
};

type DetailCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function DetailCard({
  icon,
  label,
  value,
}: DetailCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function PetMedicalExpand({
  pet,
}: PetMedicalExpandProps) {
  return (
    <Card className="bg-slate-50">
      <div className="grid gap-8 lg:grid-cols-2">

        <div>
          <h3 className="mb-5 text-lg font-semibold text-slate-900">
            Pet Information
          </h3>

          <div className="space-y-4">

            <DetailCard
              icon={<PawPrint size={18} />}
              label="Species"
              value={pet.species}
            />

            <DetailCard
              icon={<PawPrint size={18} />}
              label="Breed"
              value={pet.breed}
            />

            <DetailCard
              icon={<VenusAndMars size={18} />}
              label="Sex"
              value={pet.sex}
            />

            <DetailCard
              icon={<Scale size={18} />}
              label="Weight"
              value={`${pet.weightKg} kg`}
            />

            <DetailCard
              icon={<Calendar size={18} />}
              label="Birth Date"
              value={pet.birthDate}
            />

          </div>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold text-slate-900">
            Medical Information
          </h3>

          <div className="space-y-4">

            <DetailCard
              icon={<ShieldAlert size={18} />}
              label="Allergies"
              value={pet.allergies ?? "None"}
            />

            <DetailCard
              icon={<HeartPulse size={18} />}
              label="Chronic Conditions"
              value={pet.chronicConditions ?? "None"}
            />

            <DetailCard
              icon={<Stethoscope size={18} />}
              label="Species Note"
              value={pet.speciesNote ?? "-"}
            />

          </div>
        </div>

      </div>
    </Card>
  );
}

export default PetMedicalExpand;