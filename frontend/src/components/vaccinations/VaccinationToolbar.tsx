import {
  Download,
  Plus,
  Search,
} from "lucide-react";

type VaccinationToolbarProps = {
  onSearch: (value: string) => void;
  onSort: (value: string) => void;
  onAdd: () => void;
  onExport: () => void;
};

function VaccinationToolbar({
  onSearch,
  onSort,
  onAdd,
  onExport,
}: VaccinationToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search vaccinations..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500"
          />
        </div>

        <select
          defaultValue="administeredDesc"
          onChange={(e) => onSort(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-500"
        >
          <option value="administeredDesc">
            Newest First
          </option>

          <option value="administeredAsc">
            Oldest First
          </option>

          <option value="vaccineAsc">
            Vaccine Type (A-Z)
          </option>

          <option value="vaccineDesc">
            Vaccine Type (Z-A)
          </option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 font-medium transition hover:bg-slate-50"
        >
          <Download size={18} />
          Export
        </button>

        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Vaccination
        </button>
      </div>
    </div>
  );
}

export default VaccinationToolbar;