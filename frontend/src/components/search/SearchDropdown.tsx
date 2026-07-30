import { CalendarDays, Loader2, PawPrint, User } from "lucide-react";
import { Link } from "react-router-dom";

import type { SearchResponse } from "../../types/search";

interface SearchDropdownProps {
  query: string;
  isLoading: boolean;
  data?: SearchResponse;
  onClose: () => void;
}
const formatSpecies = (species: string) =>
  species.charAt(0) + species.slice(1).toLowerCase();

const formatVisitDate = (date: string) =>
  new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const getStatusBadge = (status: string) => {
  switch (status) {
    case "SCHEDULED":
      return "bg-emerald-100 text-emerald-700";

    case "CHECKED_IN":
      return "bg-blue-100 text-blue-700";

    case "IN_EXAM":
      return "bg-amber-100 text-amber-700";

    case "COMPLETED":
      return "bg-slate-200 text-slate-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-600";
  }
};

function SearchDropdown({
  query,
  isLoading,
  data,
  onClose,
}: SearchDropdownProps) {
  if (!query.trim()) {
    return null;
  }

  const owners = data?.owners ?? [];
  const pets = data?.pets ?? [];
  const visits = data?.visits ?? [];

  const hasResults =
    owners.length > 0 ||
    pets.length > 0 ||
    visits.length > 0;

  return (
    <div
      className="
        absolute
        left-0
        right-0
        top-full
        z-50
        mt-2
        max-h-96
        overflow-y-auto
        rounded-xl
        border
        border-slate-200
        bg-white
        shadow-xl
      "
    >
      {isLoading && (
        <div className="flex items-center justify-center gap-2 p-6 text-sm text-slate-500">
          <Loader2
            size={18}
            className="animate-spin"
          />

          <span>Searching...</span>
        </div>
      )}

      {!isLoading && !hasResults && (
        <div className="p-6 text-center text-sm text-slate-500">
          No results found.
        </div>
      )}

      {!isLoading && hasResults && (
        <>
          {owners.length > 0 && (
            <section className="border-b border-slate-100">

              <h3 className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
  Owners ({owners.length})
</h3>

              {owners.map((owner) => (
                <Link
                  key={owner.id}
                  to="/owners"
                  onClick={onClose}
                  className="flex items-start gap-3 px-4 py-3 transition hover:bg-slate-50"
                >
                  <User
                    size={18}
                    className="mt-0.5 text-cyan-600"
                  />

                  <div className="min-w-0">
                    <p className="font-medium text-slate-800">
                      {owner.firstName} {owner.lastName}
                    </p>

                    <p className="truncate text-sm text-slate-500">
                      {owner.email}
                    </p>

                    <p className="text-xs text-slate-400">
                      {owner.phone}
                    </p>
                  </div>
                </Link>
              ))}
            </section>
          )}

          {pets.length > 0 && (
            <section className="border-b border-slate-100">

              <h3 className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
  Pets ({pets.length})
</h3>

              {pets.map((pet) => (
                <Link
                  key={pet.id}
                  to="/pets"
                  onClick={onClose}
                  className="flex items-start gap-3 px-4 py-3 transition hover:bg-slate-50"
                >
                  <PawPrint
                    size={18}
                    className="mt-0.5 text-emerald-600"
                  />

                  <div className="min-w-0">
                    <p className="font-medium text-slate-800">
                      {pet.name}
                    </p>

                    <p className="text-sm text-slate-500">
  {formatSpecies(pet.species)}
</p>

                    <p className="truncate text-xs text-slate-400">
                      Owner: {pet.ownerName}
                    </p>
                  </div>
                </Link>
              ))}
            </section>
          )}

          {visits.length > 0 && (
            <section>

              <h3 className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
  Appointments ({visits.length})
</h3>

              {visits.map((visit) => (
                <Link
                  key={visit.id}
                  to="/appointments"
                  onClick={onClose}
                  className="flex items-start gap-3 px-4 py-3 transition hover:bg-slate-50"
                >
                  <CalendarDays
                    size={18}
                    className="mt-0.5 text-amber-600"
                  />

                  <div className="min-w-0">
                    <p className="font-medium text-slate-800">
                      {visit.petName}
                    </p>

                    <p className="text-sm text-slate-500">
  {formatVisitDate(visit.scheduledAt)}
</p>

                    <span
  className={`
    mt-1
    inline-flex
    rounded-full
    px-2
    py-0.5
    text-xs
    font-medium
    ${getStatusBadge(visit.status)}
  `}
>
  {visit.status
  .toLowerCase()
  .replace("_", " ")
  .replace(/\b\w/g, (char) => char.toUpperCase())}
</span>
                  </div>
                </Link>
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default SearchDropdown;