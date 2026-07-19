import {
  Pencil,
  Trash2,
} from "lucide-react";

import type { Pet } from "../../types/pet";


type PetActionsProps = {
  pet: Pet;
  onEdit: (pet: Pet) => void;
  onDelete: (pet: Pet) => void;
};


function PetActions({
  pet,
  onEdit,
  onDelete,
}: PetActionsProps) {

  return (
    <div
      className="
        flex
        items-center
        gap-5
      "
    >

      <button
        type="button"
        onClick={() => onEdit(pet)}
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



      <button
        type="button"
        onClick={() => onDelete(pet)}
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


export default PetActions;