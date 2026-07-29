import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { CreateSupportRequest } from "../../types/support";

import {
  supportSchema,
  type SupportFormValues,
} from "../../schemas/supportSchema";

type SupportFormProps = {
  initialValues?: CreateSupportRequest;
  isLoading?: boolean;
  onSubmit: (values: CreateSupportRequest) => void;
  onCancel?: () => void;
};

function SupportForm({
  initialValues,
  isLoading = false,
  onSubmit,
  onCancel,
}: SupportFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      subject: "",
      message: "",
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
          Subject
        </label>

        <input
          {...register("subject")}
          placeholder="Briefly describe your issue"
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

        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Message
        </label>

        <textarea
          rows={6}
          {...register("message")}
          placeholder="Describe your problem in as much detail as possible..."
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            resize-none
            focus:border-blue-500
          "
        />

        {errors.message && (
          <p className="mt-1 text-sm text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
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
            disabled:cursor-not-allowed
            disabled:opacity-50
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
          {isLoading ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </form>
  );
}

export default SupportForm;