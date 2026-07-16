import { Download, Plus } from "lucide-react";
import { useState } from "react";


type OwnerToolbarProps = {
  onSearch: (value: string) => void;
  onSort: (value: string) => void;
  onAdd: () => void;
};


function OwnerToolbar({
  onSearch,
  onSort,
  onAdd,
}: OwnerToolbarProps) {


  const [searchValue, setSearchValue] =
    useState("");



  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const value = e.target.value;

    setSearchValue(value);

    onSearch(value);

  };




  return (

    <div
      className="
        flex
        flex-col
        gap-4
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >


      <div
        className="
          flex
          flex-1
          flex-col
          gap-4
          sm:flex-row
        "
      >



        <input

          type="text"

          value={searchValue}

          onChange={handleSearch}

          placeholder="Search owners..."

          className="
            h-11
            w-full
            rounded-xl
            border
            border-slate-200
            px-4
            text-sm
            outline-none
            transition
            focus:border-blue-500
          "

        />





        <select

          onChange={(e) =>
            onSort(e.target.value)
          }

          className="
            h-11
            rounded-xl
            border
            border-slate-200
            px-4
            text-sm
            outline-none
            focus:border-blue-500
          "

        >

          <option value="nameAsc">
            Name (A-Z)
          </option>

          <option value="nameDesc">
            Name (Z-A)
          </option>

          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>


        </select>


      </div>





      <div
        className="
          flex
          items-center
          gap-3
        "
      >



        <button

          className="
            flex
            h-11
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            px-5
            text-sm
            font-medium
            hover:bg-slate-50
          "

        >

          <Download size={18}/>

          Export

        </button>





        <button

          onClick={onAdd}

          className="
            flex
            h-11
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            text-sm
            font-medium
            text-white
            hover:bg-blue-700
          "

        >

          <Plus size={18}/>

          Add Owner

        </button>



      </div>



    </div>

  );

}


export default OwnerToolbar;