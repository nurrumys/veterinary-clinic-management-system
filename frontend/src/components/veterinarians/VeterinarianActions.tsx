import {
  Pencil,
} from "lucide-react";

import type { Veterinarian } from "../../types/veterinarian";

type VeterinarianActionsProps = {
  veterinarian: Veterinarian;

  onEdit: (
    veterinarian: Veterinarian
  ) => void;
};

function VeterinarianActions({
  veterinarian,
  onEdit,
}: VeterinarianActionsProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-center
      "
    >
      <button
        type="button"
        onClick={() =>
          onEdit(veterinarian)
        }
        className="
          text-blue-600
          transition
          hover:text-blue-800
        "
        title="Edit"
      >
        <Pencil size={20} />
      </button>
    </div>
  );
}

export default VeterinarianActions;