import {
  Pencil,
  Trash2,
} from "lucide-react";


type OwnerActionsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};


function OwnerActions({
  onEdit,
  onDelete,
}: OwnerActionsProps) {


  return (

    <div
      className="
        flex
        items-center
        gap-4
      "
    >

      <button
        type="button"
        onClick={onEdit}
        className="
          text-blue-600
          transition
          hover:text-blue-800
        "
      >
        <Pencil size={20}/>
      </button>


      <button
        type="button"
        onClick={onDelete}
        className="
          text-red-600
          transition
          hover:text-red-800
        "
      >
        <Trash2 size={20}/>
      </button>


    </div>

  );
}


export default OwnerActions;