import { PawPrint } from "lucide-react";

function PetEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
      <div className="rounded-full bg-slate-100 p-4">
        <PawPrint
          size={36}
          className="text-slate-500"
        />
      </div>

      <h3 className="mt-6 text-lg font-semibold text-slate-900">
        No pets found
      </h3>

      <p className="mt-2 max-w-sm text-sm text-slate-500">
        Try adjusting your search or filters, or add a new pet.
      </p>
    </div>
  );
}

export default PetEmpty;