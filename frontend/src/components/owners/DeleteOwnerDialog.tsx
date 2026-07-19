import Modal from "../ui/Modal";


type DeleteOwnerDialogProps = {
  open: boolean;

  ownerName: string;

  errorMessage?: string;

  isLoading?: boolean;

  onClose: () => void;

  onConfirm: () => void;
};



function DeleteOwnerDialog({
  open,
  ownerName,
  errorMessage = "",
  isLoading = false,
  onClose,
  onConfirm,
}: DeleteOwnerDialogProps) {


  return (

    <Modal
      open={open}
      title="Delete Owner"
      onClose={onClose}

      footer={
        <>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
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
              disabled:opacity-50
            "
          >
            Cancel
          </button>



          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="
              rounded-xl
              bg-red-600
              px-5
              py-2.5
              font-medium
              text-white
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {
              isLoading
                ? "Deleting..."
                : "Delete"
            }
          </button>


        </>
      }

    >


      <div className="space-y-4">


        <p className="text-slate-700">

          Are you sure you want to delete{" "}

          <span
            className="
              font-semibold
              text-slate-900
            "
          >
            {ownerName}
          </span>

          ?

        </p>



        <p className="text-sm text-slate-500">
          This action cannot be undone.
        </p>




        {errorMessage && (

          <div
            className="
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
            "
          >

            {errorMessage}

          </div>

        )}


      </div>


    </Modal>

  );

}


export default DeleteOwnerDialog;