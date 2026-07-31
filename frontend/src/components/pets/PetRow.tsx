import { useNavigate } from "react-router-dom";

import PetActions from "./PetActions";

import type { Pet } from "../../types/pet";

type PetRowProps = {
  pet: Pet;
  ownerName: string;
  onEdit: (pet: Pet) => void;
  onDelete: (pet: Pet) => void;
};

function PetRow({
  pet,
  ownerName,
  onEdit,
  onDelete,
}: PetRowProps) {
  const navigate = useNavigate();

  return (
    <tr
      className="
        border-b
        border-slate-100
        transition
        hover:bg-slate-50
      "
    >
      <td className="px-6 py-5">
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() =>
              navigate(`/pets/${pet.id}`)
            }
            className="
              w-fit
              font-semibold
              text-slate-900
              transition
              hover:text-blue-600
              hover:underline
            "
          >
            {pet.name}
          </button>

          <span
            className="
              mt-1
              text-sm
              text-slate-400
            "
          >
            ID #{pet.id}
          </span>
        </div>
      </td>

      <td
        className="
          px-6
          py-5
          text-slate-600
        "
      >
        {pet.species}
      </td>

      <td
        className="
          px-6
          py-5
          text-slate-600
        "
      >
        {pet.breed}
      </td>

      <td
        className="
          px-6
          py-5
          text-slate-600
        "
      >
        {ownerName}
      </td>

      <td className="px-6 py-5">
        <PetActions
          pet={pet}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}

export default PetRow;