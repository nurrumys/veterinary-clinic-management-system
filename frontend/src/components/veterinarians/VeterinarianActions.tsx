import {
  Pencil,
  Trash2,
} from "lucide-react";

import type { Veterinarian } from "../../types/veterinarian";


type VeterinarianActionsProps = {

  veterinarian: Veterinarian;

  onEdit: (
    veterinarian: Veterinarian
  ) => void;


  onDelete: (
    veterinarian: Veterinarian
  ) => void;

};



function VeterinarianActions({

  veterinarian,

  onEdit,

  onDelete,

}: VeterinarianActionsProps) {



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

        <Pencil size={20}/>

      </button>





      <button

        type="button"

        onClick={() =>
          onDelete(veterinarian)
        }

        className="
          text-red-600
          transition
          hover:text-red-800
        "

        title="Delete"

      >

        <Trash2 size={20}/>

      </button>



    </div>

  );

}


export default VeterinarianActions;