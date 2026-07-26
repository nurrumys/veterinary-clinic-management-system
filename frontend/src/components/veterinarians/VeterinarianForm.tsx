import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  veterinarianSchema,
  type VeterinarianFormValues,
} from "../../schemas/veterinarianSchema";

import type {
  CreateVeterinarianRequest,
  Veterinarian,
} from "../../types/veterinarian";

type VeterinarianFormProps = {
  initialValues?: Veterinarian | null;

  onSubmit: (
    values: CreateVeterinarianRequest
  ) => void;

  onCancel: () => void;
};

function VeterinarianForm({
  initialValues,
  onSubmit,
  onCancel,
}: VeterinarianFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VeterinarianFormValues>({
    resolver: zodResolver(veterinarianSchema),
    defaultValues: {
      name: "",
      specialty: "",
      licenseNo: "",
      workHours: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        name: initialValues.name,
        specialty: initialValues.specialty,
        licenseNo: initialValues.licenseNo,
        workHours: initialValues.workHours,
      });
    } else {
      reset({
        name: "",
        specialty: "",
        licenseNo: "",
        workHours: "",
      });
    }
  }, [initialValues, reset]);

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values))}
      className="space-y-6"
    >
      {/* Name */}
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
          Name
        </label>

        <input
          {...register("name")}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            focus:border-blue-500
          "
          placeholder="Enter veterinarian name"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-5
        "
      >
        {/* Specialty */}
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
            Specialty
          </label>

          <input
            {...register("specialty")}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
            placeholder="Enter specialty"
          />

          {errors.specialty && (
            <p className="mt-1 text-sm text-red-500">
              {errors.specialty.message}
            </p>
          )}
        </div>

        {/* License Number */}
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
            License Number
          </label>

          <input
            {...register("licenseNo")}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
            placeholder="VET-2024-001"
          />

          {errors.licenseNo && (
            <p className="mt-1 text-sm text-red-500">
              {errors.licenseNo.message}
            </p>
          )}
        </div>
      </div>

      {/* Work Hours */}
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
          Work Hours
        </label>

        <input
          {...register("workHours")}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            focus:border-blue-500
          "
          placeholder="09:00 - 17:00"
        />

        {errors.workHours && (
          <p className="mt-1 text-sm text-red-500">
            {errors.workHours.message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div
        className="
          flex
          justify-end
          gap-4
          pt-5
        "
      >
        <button
          type="button"
          onClick={onCancel}
          className="
            rounded-xl
            border
            border-slate-300
            px-5
            py-3
            font-medium
            text-slate-700
            transition
            hover:bg-slate-100
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          className="
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-blue-700
          "
        >
          Save Veterinarian
        </button>
      </div>
    </form>
  );
}

export default VeterinarianForm;