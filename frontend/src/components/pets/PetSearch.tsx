import { Search } from "lucide-react";

type PetSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

function PetSearch({
  value,
  onChange,
}: PetSearchProps) {
  return (
    <div className="relative min-w-[280px] flex-1">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by pet name, species or breed..."
        className="
          w-full
          rounded-2xl
          border
          border-slate-300
          bg-white
          py-3.5
          pl-11
          pr-4
          text-sm
          text-slate-900
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
      />

    </div>
  );
}

export default PetSearch;