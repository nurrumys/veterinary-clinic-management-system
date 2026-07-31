import {
  Eye,
  Pencil,
  Archive,
  RotateCcw,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  return (
    <div
      className="
        flex
        items-center
        gap-5
      "
    >

      {/* View */}

      <button
        type="button"
        onClick={() => navigate(`/pets/${pet.id}`)}
        className="
          flex
          items-center
          justify-center
          text-slate-600
          transition
          hover:text-slate-900
        "
        title="View"
      >
        <Eye
          size={20}
          strokeWidth={2}
        />
      </button>

      {/* Edit */}

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

      {/* Archive / Restore */}

      {!pet.archived ? (

        <button
          type="button"
          onClick={() => onDelete(pet)}
          className="
            flex
            items-center
            justify-center
            text-orange-600
            transition
            hover:text-orange-800
          "
          title="Archive"
        >
          <Archive
            size={20}
            strokeWidth={2}
          />
        </button>

      ) : (

        <button
          type="button"
          onClick={() => onDelete(pet)}
          className="
            flex
            items-center
            justify-center
            text-green-600
            transition
            hover:text-green-800
          "
          title="Restore"
        >
          <RotateCcw
            size={20}
            strokeWidth={2}
          />
        </button>

      )}

    </div>
  );
}

export default PetActions;