import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { VisitStatus } from "../../types/visit";

type UpdateStatusDialogProps = {
  initialStatus: VisitStatus;
  isLoading?: boolean;
  onSubmit: (status: VisitStatus) => void;
  onCancel?: () => void;
};

type FormValues = {
  status: VisitStatus;
};

function UpdateStatusDialog({
  initialStatus,
  isLoading = false,
  onSubmit,
  onCancel,
}: UpdateStatusDialogProps) {
  const { register, handleSubmit, reset } =
    useForm<FormValues>({
      defaultValues: {
        status: initialStatus,
      },
    });

  useEffect(() => {
    reset({
      status: initialStatus,
    });
  }, [initialStatus, reset]);

  return (
    <form
      onSubmit={handleSubmit((values) =>
        onSubmit(values.status)
      )}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Appointment Status
        </label>

        <select
          {...register("status")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        >
          <option value="SCHEDULED">
            Scheduled
          </option>

          <option value="CHECKED_IN">
            Checked In
          </option>

          <option value="IN_EXAM">
            In Examination
          </option>

          <option value="COMPLETED">
            Completed
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading
            ? "Updating..."
            : "Update Status"}
        </button>
      </div>
    </form>
  );
}

export default UpdateStatusDialog;