import Card from "../ui/Card";

import VeterinarianRow from "./VeterinarianRow";

import type { Veterinarian } from "../../types/veterinarian";

type VeterinarianTableProps = {
  veterinarians: Veterinarian[];

  onEdit: (veterinarian: Veterinarian) => void;
};

function VeterinarianTable({
  veterinarians,
  onEdit,
}: VeterinarianTableProps) {
  return (
    <Card>
      <div
        className="
          w-full
          overflow-hidden
        "
      >
        <table
          className="
            w-full
            table-fixed
          "
        >
          <thead
            className="
              border-b
              border-slate-200
              bg-slate-50
            "
          >
            <tr>
              <th className="w-[25%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Name
              </th>

              <th className="w-[20%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Specialty
              </th>

              <th className="w-[18%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                License
              </th>

              <th className="w-[17%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Work Hours
              </th>

              <th className="w-[10%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="w-[10%] px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {veterinarians.length > 0 ? (
              veterinarians.map((veterinarian) => (
                <VeterinarianRow
                  key={veterinarian.id}
                  veterinarian={veterinarian}
                  onEdit={onEdit}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="
                    px-6
                    py-12
                    text-center
                    text-sm
                    text-slate-500
                  "
                >
                  No veterinarians found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default VeterinarianTable;