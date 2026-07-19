import {
  Download,
  Plus,
  Search,
} from "lucide-react";


type PetToolbarProps = {
  search: string;
  species: string;
  owner: string;
  sort: string;

  onSearchChange: (value: string) => void;
  onSpeciesChange: (value: string) => void;
  onOwnerChange: (value: string) => void;
  onSortChange: (value: string) => void;

  onAddPet: () => void;
  onExport: () => void;
};



function PetToolbar({
  search,
  species,
  owner,
  sort,
  onSearchChange,
  onSpeciesChange,
  onOwnerChange,
  onSortChange,
  onAddPet,
  onExport,
}: PetToolbarProps) {


  return (

    <div
      className="
        mt-8
        flex
        w-full
        items-center
        gap-3
      "
    >


      <div className="relative flex-1 min-w-0">

        <Search
          size={20}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />


        <input
          type="text"
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search pets..."
          className="
            h-12
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            pl-12
            pr-4
            text-sm
            text-slate-700
            outline-none
            focus:border-blue-500
          "
        />

      </div>




      <select
        value={species}
        onChange={(e) =>
          onSpeciesChange(e.target.value)
        }
        className="
          h-12
          w-[160px]
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
        "
      >

        <option value="">
          All Species
        </option>

        <option value="DOG">
          Dog
        </option>

        <option value="CAT">
          Cat
        </option>

        <option value="OTHER">
          Other
        </option>

      </select>





      <select
        value={owner}
        onChange={(e) =>
          onOwnerChange(e.target.value)
        }
        className="
          h-12
          w-[160px]
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
        "
      >

        <option value="">
          All Owners
        </option>

        <option value="1">
          John Smith
        </option>

        <option value="2">
          Emma Johnson
        </option>

        <option value="3">
          Michael Brown
        </option>

      </select>





      <select
        value={sort}
        onChange={(e) =>
          onSortChange(e.target.value)
        }
        className="
          h-12
          w-[150px]
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
        "
      >

        <option value="name-asc">
          Name (A-Z)
        </option>

        <option value="name-desc">
          Name (Z-A)
        </option>

        <option value="newest">
          Newest
        </option>

        <option value="oldest">
          Oldest
        </option>

      </select>





      {/* Export */}

      <button
        type="button"
        onClick={onExport}
        className="
          flex
          h-12
          w-[120px]
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          text-sm
          font-medium
          text-slate-700
          transition
          hover:bg-slate-50
        "
      >

        <Download size={18}/>

        Export

      </button>





      {/* Add Pet */}

      <button
        type="button"
        onClick={onAddPet}
        className="
          flex
          h-12
          w-[140px]
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-blue-600
          text-sm
          font-medium
          text-white
          transition
          hover:bg-blue-700
        "
      >

        <Plus size={18}/>

        Add Pet

      </button>


    </div>

  );

}


export default PetToolbar;