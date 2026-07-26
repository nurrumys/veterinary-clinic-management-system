import Card from "../ui/Card";

import type { Pet } from "../../types/pet";
import type { Vaccination } from "../../types/vaccination";

import VaccinationRow from "./VaccinationRow";

type VaccinationTableProps = {
  vaccinations: Vaccination[];
  pets: Pet[];
  onEdit: (vaccination: Vaccination) => void;
  onDelete: (vaccination: Vaccination) => void;
};

function VaccinationTable({
  vaccinations,
  pets,
  onEdit,
  onDelete,
}: VaccinationTableProps) {
  const getPetName = (petId: number) => {
    const pet = pets.find((item) => item.id === petId);

    if (!pet) {
      return "-";
    }

    return pet.name;
  };

  return (
    <Card
      className="
        mt-8
        overflow-hidden
        p-0
      "
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr
              className="
                border-b
                border-slate-200
                bg-slate-50
              "
            >
              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Pet
              </th>

              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Vaccine Type
              </th>

              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Administered At
              </th>

              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Next Due Date
              </th>

              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Administered By
              </th>

              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {vaccinations.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="
                    px-8
                    py-12
                    text-center
                    text-slate-500
                  "
                >
                  No vaccination records found.
                </td>
              </tr>
            ) : (
              vaccinations.map((vaccination) => (
                <VaccinationRow
                  key={vaccination.id}
                  vaccination={vaccination}
                  petName={getPetName(vaccination.petId)}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}


export default VaccinationTable;