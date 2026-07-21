import {
  Pencil,
  Trash2,
} from "lucide-react";

import type { Vaccination } from "../../types/vaccination";

type VaccinationActionsProps = {
  vaccination: Vaccination;
  onEdit: (vaccination: Vaccination) => void;
  onDelete: (vaccination: Vaccination) => void;
};

function VaccinationActions({
  vaccination,
  onEdit,
  onDelete,
}: VaccinationActionsProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-5
      "
    >
      {/* Edit */}

      <button
        type="button"
        onClick={() => onEdit(vaccination)}
        className="
          flex
          items-center
          justify-center
          text-blue-600
          transition
          hover:text-blue-800
        "
        title="Edit"
      >
        <Pencil
          size={20}
          strokeWidth={2}
        />
      </button>

      {/* Delete */}

      <button
        type="button"
        onClick={() => onDelete(vaccination)}
        className="
          flex
          items-center
          justify-center
          text-red-600
          transition
          hover:text-red-800
        "
        title="Delete"
      >
        <Trash2
          size={20}
          strokeWidth={2}
        />
      </button>
    </div>
  );
}

export default VaccinationActions;