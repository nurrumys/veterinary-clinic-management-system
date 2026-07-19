import Card from "../ui/Card";
import PetRow from "./PetRow";

import type { Pet } from "../../types/pet";
import type { Owner } from "../../types/owner";


type PetTableProps = {

  pets: Pet[];

  owners?: Owner[];

  onEdit: (pet: Pet) => void;

  onDelete: (pet: Pet) => void;

};



function PetTable({
  pets,
  owners = [],
  onEdit,
  onDelete,
}: PetTableProps) {



  const getOwnerName = (
    ownerId: number
  ) => {


    const owner = owners?.find(
      (item) => item.id === ownerId
    );



    if (!owner) {

      return "-";

    }



    return `${owner.firstName} ${owner.lastName}`;

  };





  return (

    <Card
      className="
        mt-8
        overflow-hidden
        p-0
      "
    >


      <div className="overflow-x-auto">


        <table className="min-w-full">


          <thead>


            <tr
              className="
                border-b
                border-slate-200
                bg-slate-50
              "
            >


              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Pet
              </th>


              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Species
              </th>


              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Breed
              </th>


              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Owner
              </th>


              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-700">
                Actions
              </th>


            </tr>


          </thead>





          <tbody>


            {pets.length === 0 ? (


              <tr>


                <td
                  colSpan={5}
                  className="
                    px-8
                    py-12
                    text-center
                    text-slate-500
                  "
                >

                  No pets found.

                </td>


              </tr>


            ) : (


              pets.map((pet) => (


                <PetRow


                  key={pet.id}


                  pet={pet}


                  ownerName={
                    getOwnerName(
                      pet.ownerId
                    )
                  }


                  onEdit={
                    onEdit
                  }


                  onDelete={
                    onDelete
                  }


                />


              ))


            )}


          </tbody>


        </table>


      </div>


    </Card>

  );

}



export default PetTable;