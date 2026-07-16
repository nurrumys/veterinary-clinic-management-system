import { Users } from "lucide-react";

function OwnerEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">

      <div className="mb-4 rounded-full bg-slate-100 p-5">
        <Users
          size={36}
          className="text-slate-400"
        />
      </div>

      <h3 className="text-lg font-semibold text-slate-800">
        No owners found
      </h3>

      <p className="mt-2 max-w-sm text-sm text-slate-500">
        There are no owners to display.
        Try changing your search or create a new owner.
      </p>

    </div>
  );
}

export default OwnerEmptyState;