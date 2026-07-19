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

          <span className="font-semibold text-slate-900">
            {pet.name}
          </span>

          <span className="mt-1 text-sm text-slate-400">
            ID #{pet.id}
          </span>

        </div>

      </td>


      <td className="px-6 py-5 text-slate-600">
        {pet.species}
      </td>


      <td className="px-6 py-5 text-slate-600">
        {pet.breed}
      </td>


      <td className="px-6 py-5 text-slate-600">
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