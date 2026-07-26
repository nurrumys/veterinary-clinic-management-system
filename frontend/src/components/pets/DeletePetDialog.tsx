import Modal from "../ui/Modal";

type DeletePetDialogProps = {
  open: boolean;
  petName: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  mode?: "archive" | "restore";
};


function DeletePetDialog({
  open,
  petName,
  isLoading = false,
  onClose,
  onConfirm,
  mode = "archive",
}: DeletePetDialogProps) {


  const isRestore = mode === "restore";


  return (

    <Modal

      open={open}

      title={
        isRestore
          ? "Restore Pet"
          : "Archive Pet"
      }

      onClose={onClose}

      footer={

        <>

          <button

            type="button"

            onClick={onClose}

            className="
              rounded-xl
              border
              border-slate-300
              px-5
              py-2.5
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100
            "

          >

            Cancel

          </button>





          <button

            type="button"

            disabled={isLoading}

            onClick={onConfirm}

            className={`
              rounded-xl
              px-5
              py-2.5
              font-medium
              text-white
              transition
              disabled:opacity-50
              ${
                isRestore
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-orange-600 hover:bg-orange-700"
              }
            `}

          >

            {
              isLoading

                ? "Saving..."

                : isRestore
                  ? "Restore"
                  : "Archive"
            }

          </button>


        </>

      }

    >



      <p className="text-slate-600">

        {isRestore
          ? "Are you sure you want to restore "
          : "Are you sure you want to archive "
        }


        <span className="font-semibold text-slate-900">

          {petName}

        </span>


        ?

      </p>




      <p className="mt-3 text-sm text-slate-500">

        {isRestore
          ? "This pet will become active again."
          : "This pet will be hidden from active lists but kept in records."
        }

      </p>



    </Modal>

  );

}


export default DeletePetDialog;