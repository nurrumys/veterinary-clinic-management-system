import { useState } from "react";

import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";


import OwnerActions from "./OwnerActions";
import OwnerPetsExpand from "./OwnerPetsExpand";


import type { Owner } from "../../types/owner";



type OwnerRowProps = {

  owner: Owner;

  onEdit: (owner: Owner) => void;

  onDelete: (owner: Owner) => void;

};




function OwnerRow({

  owner,

  onEdit,

  onDelete,

}: OwnerRowProps) {



  const [expanded, setExpanded] =
    useState(false);




  return (

    <>


      <tr
        className="
          border-b
          border-slate-100
          hover:bg-slate-50
        "
      >



        <td className="px-6 py-5">


          <div className="flex items-center gap-4">


            <button

              type="button"

              onClick={() =>
                setExpanded(!expanded)
              }

              className="text-slate-500"

            >

              {expanded
                ? <ChevronUp size={18}/>
                : <ChevronDown size={18}/>
              }


            </button>





            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-blue-100
                font-semibold
                text-blue-600
              "
            >

              {owner.firstName[0]}
              {owner.lastName[0]}


            </div>





            <div>


              <p className="font-semibold text-slate-900">

                {owner.firstName} {owner.lastName}

              </p>


              <p className="text-sm text-slate-500">

                ID #{owner.id}

              </p>


            </div>



          </div>


        </td>





        <td className="px-6 py-5">
          {owner.email}
        </td>



        <td className="px-6 py-5">
          {owner.phone}
        </td>



        <td className="px-6 py-5">
          {owner.petCount}
        </td>





        <td className="px-6 py-5">


          <OwnerActions



            onEdit={() =>
              onEdit(owner)
            }



            onDelete={() =>
              onDelete(owner)
            }



          />


        </td>



      </tr>






      {expanded && (


        <tr className="bg-slate-50">


          <td
            colSpan={5}
            className="px-8 py-6"
          >


            <OwnerPetsExpand
              ownerId={owner.id}
            />


          </td>


        </tr>


      )}



    </>

  );

}



export default OwnerRow;
