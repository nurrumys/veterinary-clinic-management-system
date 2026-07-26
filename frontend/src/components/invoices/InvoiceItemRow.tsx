import { Trash2 } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";



import type { InvoiceFormValues } from "../../schemas/invoiceSchema";

type InvoiceItemRowProps = {
  index: number;

  register: UseFormRegister<InvoiceFormValues>;

  errors: FieldErrors<InvoiceFormValues>;

  onRemove: (index: number) => void;

  canRemove: boolean;
};

function InvoiceItemRow({
  index,
  register,
  errors,
  onRemove,
  canRemove,
}: InvoiceItemRowProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-5
      "
    >
      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {/* Description */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>

          <input
            type="text"
            placeholder="Enter description"
            {...register(`items.${index}.description`)}
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

          <p className="mt-1 text-sm text-red-500">
            {errors.items?.[index]?.description?.message}
          </p>
        </div>

        {/* Category */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Category
          </label>

          <select
            {...register(`items.${index}.category`)}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              outline-none
              transition
              focus:border-blue-500
            "
          >
            <option value="CONSULTATION">Consultation</option>
            <option value="MEDICATION">Medication</option>
            <option value="VACCINATION">Vaccination</option>
            <option value="SURGERY">Surgery</option>
            <option value="LAB_TEST">Lab Test</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Quantity */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Quantity
          </label>

          <input
            type="number"
            min={1}
            {...register(`items.${index}.quantity`, {
              valueAsNumber: true,
            })}
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

          <p className="mt-1 text-sm text-red-500">
            {errors.items?.[index]?.quantity?.message}
          </p>
        </div>

        {/* Unit Price */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Unit Price
          </label>

          <input
            type="number"
            step="0.01"
            min={0}
            {...register(`items.${index}.unitPrice`, {
              valueAsNumber: true,
            })}
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

          <p className="mt-1 text-sm text-red-500">
            {errors.items?.[index]?.unitPrice?.message}
          </p>
        </div>
      </div>

      {canRemove && (
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-red-200
              px-4
              py-2
              text-red-600
              transition
              hover:bg-red-50
            "
          >
            <Trash2 size={18} />
            Remove Item
          </button>
        </div>
      )}
    </div>
  );
}

export default InvoiceItemRow;