import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { UpdateMedicalNotesRequest } from "../../types/visit";

type MedicalNotesDialogProps = {
  initialValues?: UpdateMedicalNotesRequest;
  isLoading?: boolean;
  onSubmit: (values: UpdateMedicalNotesRequest) => void;
  onCancel?: () => void;
};

function MedicalNotesDialog({
  initialValues,
  isLoading = false,
  onSubmit,
  onCancel,
}: MedicalNotesDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<UpdateMedicalNotesRequest>({
    defaultValues: {
      diagnosis: "",
      treatmentNotes: "",
      followUpDate: null,
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values))}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Diagnosis
        </label>

        <textarea
          rows={3}
          {...register("diagnosis")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Treatment Notes
        </label>

        <textarea
          rows={5}
          {...register("treatmentNotes")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Follow-up Date
        </label>

        <input
          type="date"
          {...register("followUpDate")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        />
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
            ? "Saving..."
            : "Save Notes"}
        </button>
      </div>
    </form>
  );
}

export default MedicalNotesDialog;