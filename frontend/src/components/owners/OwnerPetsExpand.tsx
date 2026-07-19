import { PawPrint } from "lucide-react";

import { pets } from "../../mocks/pets";

type OwnerPetsExpandProps = {
  ownerId: number;
};

function OwnerPetsExpand({
  ownerId,
}: OwnerPetsExpandProps) {
  const ownerPets = pets.filter(
    (pet) => pet.ownerId === ownerId
  );

  if (ownerPets.length === 0) {
    return (
      <div className="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
        No pets found for this owner.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {ownerPets.map((pet) => (
        <div
          key={pet.id}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <PawPrint size={22} />
              </div>

              <div>
                <h4 className="font-semibold text-slate-900">
                  {pet.name}
                </h4>

                <p className="text-sm text-slate-500">
                  {pet.breed}
                </p>
              </div>

            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
              {pet.species}
            </span>

          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Gender
              </p>

              <p className="mt-1 font-medium text-slate-700">
                {pet.sex}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Weight
              </p>

              <p className="mt-1 font-medium text-slate-700">
                {pet.weightKg} kg
              </p>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default OwnerPetsExpand;