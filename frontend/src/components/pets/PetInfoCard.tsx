import type { Pet } from "../../types/pet";

type PetInfoCardProps = {
  pet: Pet;
};

function PetInfoCard({
  pet,
}: PetInfoCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <h2
        className="
          mb-6
          text-xl
          font-semibold
          text-slate-900
        "
      >
        Pet Information
      </h2>

      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
        "
      >
        <div>
          <p className="text-sm text-slate-500">
            Name
          </p>

          <p className="font-medium">
            {pet.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Species
          </p>

          <p className="font-medium">
            {pet.species}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Breed
          </p>

          <p className="font-medium">
            {pet.breed || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Birth Date
          </p>

          <p className="font-medium">
            {pet.birthDate}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Sex
          </p>

          <p className="font-medium">
            {pet.sex}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Weight
          </p>

          <p className="font-medium">
            {pet.weightKg} kg
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Allergies
          </p>

          <p className="font-medium">
            {pet.allergies || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Chronic Conditions
          </p>

          <p className="font-medium">
            {pet.chronicConditions || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Archived
          </p>

          <p className="font-medium">
            {pet.archived ? "Yes" : "No"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Inactive
          </p>

          <p className="font-medium">
            {pet.inactive ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PetInfoCard;