import { Download } from "lucide-react";

type VeterinarianToolbarProps = {
  sort: string;
  onSortChange: (value: string) => void;
  onExport: () => void;
};

function VeterinarianToolbar({
  sort,
  onSortChange,
  onExport,
}: VeterinarianToolbarProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
      "
    >
      <div className="flex items-center gap-3">
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
          <option value="specialty,asc">
            Specialty (A-Z)
          </option>
          <option value="specialty,desc">
            Specialty (Z-A)
          </option>
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
      </div>
    </div>
  );
}

export default VeterinarianToolbar;