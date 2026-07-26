import VeterinarianActions from "./VeterinarianActions";
import type { Veterinarian } from "../../types/veterinarian";

type VeterinarianRowProps = {
  veterinarian: Veterinarian;

  onEdit: (veterinarian: Veterinarian) => void;
};

function VeterinarianRow({
  veterinarian,
  onEdit,
}: VeterinarianRowProps) {
  return (
    <tr
      className="
        border-b
        border-slate-100
        transition
        hover:bg-slate-50
      "
    >
      {/* Name */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-blue-100
              font-semibold
              text-blue-600
            "
          >
            {veterinarian.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              {veterinarian.name}
            </p>

            <p className="text-sm text-slate-500">
              ID #{veterinarian.id}
            </p>
          </div>
        </div>
      </td>

      {/* Specialty */}
      <td
        className="
          px-6
          py-5
          whitespace-nowrap
          text-slate-600
        "
      >
        {veterinarian.specialty}
      </td>

      {/* License */}
      <td
        className="
          px-6
          py-5
          whitespace-nowrap
          text-slate-600
        "
      >
        {veterinarian.licenseNo}
      </td>

      {/* Work Hours */}
      <td
        className="
          px-6
          py-5
          whitespace-nowrap
          text-slate-600
        "
      >
        {veterinarian.workHours}
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <span
          className={`
            inline-flex
            whitespace-nowrap
            rounded-full
            px-3
            py-1
            text-xs
            font-medium
            ${
              veterinarian.active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {veterinarian.active ? "ACTIVE" : "INACTIVE"}
        </span>
      </td>

      {/* Actions */}
      <td className="w-[150px] px-6 py-5">
        <VeterinarianActions
          veterinarian={veterinarian}
          onEdit={onEdit}
        />
      </td>
    </tr>
  );
}

export default VeterinarianRow;