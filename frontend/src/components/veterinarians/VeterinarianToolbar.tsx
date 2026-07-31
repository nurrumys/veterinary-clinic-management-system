import { Download } from "lucide-react";

type VeterinarianToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;

  sort: string;
  onSortChange: (value: string) => void;

  onExport: () => void;

  onAdd: () => void;
};

function VeterinarianToolbar({
  search,
  onSearchChange,
  sort,
  onSortChange,
  onExport,
  onAdd,
}: VeterinarianToolbarProps) {
  return (
    <div
  className="
    grid
    grid-cols-[2fr_1.4fr_auto_auto]
    items-center
    gap-4
    rounded-2xl
    border
    border-slate-200
    bg-white
    p-4
    shadow-sm
  "
>
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search veterinarians..."
        className="
          h-11
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          text-sm
          text-slate-700
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-blue-500
        "
      />

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="
          h-11
          min-w-[220px]
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          text-sm
          font-medium
          text-slate-700
          outline-none
          transition
          focus:border-blue-500
        "
      >
        <option value="name,asc">Name (A-Z)</option>
        <option value="name,desc">Name (Z-A)</option>
        <option value="specialty,asc">Specialty (A-Z)</option>
        <option value="specialty,desc">Specialty (Z-A)</option>
      </select>

      {/* Export */}
      <button
        type="button"
        onClick={onExport}
        className="
          flex
          h-11
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-5
          text-sm
          font-medium
          text-slate-700
          transition
          hover:bg-slate-50
        "
      >
        <Download size={18} />
        Export
      </button>

      {/* Add Veterinarian */}
      <button
        type="button"
        onClick={onAdd}
        className="
          flex
          h-11
          items-center
          rounded-xl
          bg-blue-600
          px-6
          text-sm
          font-medium
          text-white
          transition
          hover:bg-blue-700
        "
      >
        + Add Veterinarian
      </button>
    </div>
  );
}

export default VeterinarianToolbar;