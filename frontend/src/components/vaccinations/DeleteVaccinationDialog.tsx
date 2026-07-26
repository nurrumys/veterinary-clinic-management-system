import Modal from "../ui/Modal";

import type { Vaccination } from "../../types/vaccination";

type DeleteVaccinationDialogProps = {
  open: boolean;

  vaccination: Vaccination | null;

  onClose: () => void;

  onConfirm: () => void;
};

function DeleteVaccinationDialog({
  open,
  vaccination,
  onClose,
  onConfirm,
}: DeleteVaccinationDialogProps) {
  return (
    <Modal
      open={open}
      title="Delete Vaccination"
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
              hover:bg-slate-100
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              rounded-xl
              bg-red-600
              px-5
              py-2.5
              font-medium
              text-white
              hover:bg-red-700
            "
          >
            Delete
          </button>
        </>
      }
    >
      <p className="text-slate-600">
        Are you sure you want to delete the vaccination record for{" "}
        <span className="font-semibold text-slate-900">
          {vaccination?.vaccineType ?? "-"}
        </span>
        ?
      </p>

      <p className="mt-3 text-sm text-slate-500">
        This action cannot be undone.
      </p>
    </Modal>
  );
}

export default DeleteVaccinationDialog;