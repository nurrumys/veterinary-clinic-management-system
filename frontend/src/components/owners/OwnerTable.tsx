import Card from "../ui/Card";

import { owners } from "../../mocks/owners";

import OwnerRow from "./OwnerRow";

import type { Owner } from "../../types/owner";



type OwnerTableProps = {

  onEdit: (owner: Owner) => void;

  onDelete: (owner: Owner) => void;

  searchTerm: string;

  sortOption: string;

};





function OwnerTable({

  onEdit,

  onDelete,

  searchTerm,

  sortOption,

}: OwnerTableProps) {




  let filteredOwners = [...owners];





  // Search

  if (searchTerm) {

    filteredOwners =
      filteredOwners.filter((owner) =>

        `${owner.firstName} ${owner.lastName}`
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        owner.email
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

      );

  }






  // Sort

  if (sortOption === "nameAsc") {

    filteredOwners.sort((a, b) =>
      `${a.firstName} ${a.lastName}`
        .localeCompare(
          `${b.firstName} ${b.lastName}`
        )
    );


  }



  if (sortOption === "nameDesc") {

    filteredOwners.sort((a, b) =>
      `${b.firstName} ${b.lastName}`
        .localeCompare(
          `${a.firstName} ${a.lastName}`
        )
    );


  }




  if (sortOption === "newest") {

    filteredOwners.sort((a, b) =>
      new Date(b.createdAt).getTime()
      -
      new Date(a.createdAt).getTime()
    );

  }




  if (sortOption === "oldest") {

    filteredOwners.sort((a, b) =>
      new Date(a.createdAt).getTime()
      -
      new Date(b.createdAt).getTime()
    );

  }







  return (


    <Card>


      <div className="overflow-x-auto">


        <table className="min-w-full">



          <thead
            className="
              border-b
              border-slate-200
              bg-slate-50
            "
          >


            <tr>


              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Owner
              </th>


              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Email
              </th>


              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Phone
              </th>


              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Pets
              </th>


              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Actions
              </th>



            </tr>


          </thead>







          <tbody>


            {filteredOwners.map((owner) => (


              <OwnerRow


                key={owner.id}


                owner={owner}


                onEdit={onEdit}


                onDelete={onDelete}


              />


            ))}



          </tbody>




        </table>



      </div>


    </Card>


  );

}



export default OwnerTable;