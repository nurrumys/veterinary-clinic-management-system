import { useForm } from "react-hook-form";

import Modal from "../ui/Modal";

import type {
  CreatePetWeightRecordRequest,
} from "../../types/petWeightRecord";

type AddWeightDialogProps = {
  open: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (
    values: CreatePetWeightRecordRequest
  ) => void;
};

function AddWeightDialog({
  open,
  isLoading = false,
  onClose,
  onSubmit,
}: AddWeightDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
  } =
    useForm<CreatePetWeightRecordRequest>({
      defaultValues: {
        weightKg: 0,
        recordedAt: new Date()
          .toISOString()
          .slice(0, 16),
        note: "",
      },
    });

  const submit = (
    values: CreatePetWeightRecordRequest
  ) => {
    onSubmit(values);

    reset();

    onClose();
  };

  return (
    <Modal
      open={open}
      title="Add Weight Record"
      onClose={onClose}
      maxWidth="sm"
    >
      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-6"
      >
        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-700
            "
          >
            Weight (kg)
          </label>

          <input
            type="number"
            step="0.1"
            {...register(
              "weightKg",
              {
                valueAsNumber: true,
              }
            )}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              transition
              focus:border-blue-500
            "
          />
        </div>

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-700
            "
          >
            Recorded At
          </label>

          <input
            type="datetime-local"
            {...register("recordedAt")}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              transition
              focus:border-blue-500
            "
          />
        </div>

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-700
            "
          >
            Note
          </label>

          <textarea
            rows={3}
            {...register("note")}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              transition
              focus:border-blue-500
            "
          />
        </div>

        <div
          className="
            flex
            justify-end
            gap-3
          "
        >
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
              text-slate-600
              transition
              hover:bg-slate-100
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              font-medium
              text-white
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isLoading
              ? "Saving..."
              : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddWeightDialog;