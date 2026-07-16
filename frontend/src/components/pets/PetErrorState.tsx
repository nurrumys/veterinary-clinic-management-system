import { TriangleAlert } from "lucide-react";

type PetErrorProps = {
  message?: string;
};

function PetError({
  message = "Something went wrong while loading pets.",
}: PetErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 py-16 text-center">
      <TriangleAlert
        size={42}
        className="text-red-500"
      />

      <h3 className="mt-4 text-lg font-semibold text-red-700">
        Unable to load pets
      </h3>

      <p className="mt-2 text-sm text-red-600">
        {message}
      </p>
    </div>
  );
}

export default PetError;