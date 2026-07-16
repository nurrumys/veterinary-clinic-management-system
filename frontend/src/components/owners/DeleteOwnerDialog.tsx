import Modal from "../ui/Modal";

type DeleteOwnerDialogProps = {
  open: boolean;
  ownerName: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

function DeleteOwnerDialog({
  open,
  ownerName,
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
            className="rounded-xl border border-slate-300 px-4 py-2 font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-xl bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </>
      }
    >
      <div className="space-y-3">

        <p className="text-slate-700">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            {ownerName}
          </span>
          ?
        </p>

        <p className="text-sm text-slate-500">
          This action cannot be undone.
        </p>

      </div>
    </Modal>
  );
}

export default DeleteOwnerDialog;