import Modal from "../ui/Modal";

type DeletePetDialogProps = {
  open: boolean;
  petName: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

function DeletePetDialog({
  open,
  petName,
  isLoading = false,
  onClose,
  onConfirm,
}: DeletePetDialogProps) {
  return (
    <Modal
      open={open}
      title="Delete Pet"
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </>
      }
    >
      <p className="text-slate-600">
        Are you sure you want to delete{" "}
        <span className="font-semibold text-slate-900">
          {petName}
        </span>
        ?
      </p>

      <p className="mt-3 text-sm text-slate-500">
        This action cannot be undone.
      </p>
    </Modal>
  );
}

export default DeletePetDialog;