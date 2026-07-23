import {
  useEffect,
  useState,
} from "react";

import {
  useFieldArray,
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import type { Visit } from "../../types/visit";

import type {
  CreateInvoiceRequest,
} from "../../types/invoice";

import { getVisits } from "../../services/visitService";

import {
  invoiceSchema,
  type InvoiceFormValues,
} from "../../schemas/invoiceSchema";

import InvoiceItemRow from "./InvoiceItemRow";

type InvoiceFormProps = {
  initialValues?: CreateInvoiceRequest;

  isLoading?: boolean;

  mode?: "create" | "edit";

  onSubmit: (
    values: CreateInvoiceRequest
  ) => void;

  onCancel?: () => void;
};

function InvoiceForm({
  initialValues,
  isLoading = false,
  mode = "create",
  onSubmit,
  onCancel,
}: InvoiceFormProps) {

  const [visits, setVisits] = useState<Visit[]>([]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),

    defaultValues: {
      visitId: 0,

      items: [
        {
          description: "",
          category: "CONSULTATION",
          quantity: 1,
          unitPrice: 0,
        },
      ],
    },
  });

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response =
          await getVisits();

        setVisits(response.content);
      } catch (error) {
        console.error(
          "Failed to load visits:",
          error
        );
      }
    };

    fetchVisits();
  }, []);

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [
    initialValues,
    reset,
  ]);

  return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-8"
  >
          {/* Invoice Information */}

      <section
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <div className="mb-6">
          <h2
            className="
              text-lg
              font-semibold
              text-slate-900
            "
          >
            Invoice Information
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Select the visit for this invoice.
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
          "
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
              Visit
            </label>

            <select
              {...register("visitId", {
                valueAsNumber: true,
              })}
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
              <option value={0}>
                Select Visit
              </option>

              {visits.map((visit) => (
                <option
                  key={visit.id}
                  value={visit.id}
                >
                  Visit #{visit.id}
                </option>
              ))}
            </select>

            {errors.visitId && (
              <p
                className="
                  mt-1
                  text-sm
                  text-red-500
                "
              >
                {errors.visitId.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Invoice Items */}

      <section
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <div
          className="
            mb-6
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2
              className="
                text-lg
                font-semibold
                text-slate-900
              "
            >
              Invoice Items
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Add one or more invoice items.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              append({
                description: "",
                category: "CONSULTATION",
                quantity: 1,
                unitPrice: 0,
              })
            }
            className="
              rounded-xl
              bg-blue-600
              px-4
              py-2
              font-medium
              text-white
              transition
              hover:bg-blue-700
            "
          >
            Add Item
          </button>
        </div>

        <div className="space-y-5">
          {fields.map((field, index) => (
            <InvoiceItemRow
              key={field.id}
              index={index}
              register={register}
              errors={errors}
              onRemove={remove}
              canRemove={fields.length > 1}
            />
          ))}
        </div>
      </section>
            {/* Actions */}

      <div
        className="
          flex
          justify-end
          gap-3
        "
      >
        <button
          type="button"
          onClick={() => onCancel?.()}
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
            : mode === "edit"
              ? "Save Changes"
              : "Create Invoice"}
        </button>
      </div>
    </form>
  );
}

export default InvoiceForm;
