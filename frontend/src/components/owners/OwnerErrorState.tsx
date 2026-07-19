import { TriangleAlert } from "lucide-react";

type OwnerErrorStateProps = {
  message?: string;
};

function OwnerErrorState({
  message = "Something went wrong while loading owners.",
}: OwnerErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">

      <div className="mb-4 rounded-full bg-red-100 p-5">
        <TriangleAlert
          size={36}
          className="text-red-600"
        />
      </div>

      <h3 className="text-lg font-semibold text-slate-800">
        Unable to load owners
      </h3>

      <p className="mt-2 max-w-sm text-sm text-slate-500">
        {message}
      </p>

    </div>
  );
}

export default OwnerErrorState;