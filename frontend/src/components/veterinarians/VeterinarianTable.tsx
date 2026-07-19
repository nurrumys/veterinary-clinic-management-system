import Card from "../ui/Card";

import { veterinarians } from "../../mocks/veterinarians";

import VeterinarianRow from "./VeterinarianRow";

import type { Veterinarian } from "../../types/veterinarian";


type VeterinarianTableProps = {

  onEdit: (
    veterinarian: Veterinarian
  ) => void;


  onDelete: (
    veterinarian: Veterinarian
  ) => void;

};



function VeterinarianTable({

  onEdit,

  onDelete,

}: VeterinarianTableProps) {


  return (

    <Card>


      <div
        className="
          w-full
          overflow-hidden
        "
      >


        <table
          className="
            w-full
            table-fixed
          "
        >


          <thead
            className="
              border-b
              border-slate-200
              bg-slate-50
            "
          >

            <tr>


              <th
                className="
                  w-[18%]
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Name
              </th>



              <th
                className="
                  w-[22%]
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Email
              </th>




              <th
                className="
                  w-[15%]
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Phone
              </th>




              <th
                className="
                  w-[16%]
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Specialty
              </th>




              <th
                className="
                  w-[14%]
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                License
              </th>




              <th
                className="
                  w-[10%]
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Status
              </th>




              <th
                className="
                  w-[10%]
                  px-6
                  py-4
                  text-center
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Actions
              </th>


            </tr>


          </thead>





          <tbody>


            {veterinarians.map((veterinarian) => (


              <VeterinarianRow


                key={
                  veterinarian.id
                }



                veterinarian={
                  veterinarian
                }



                onEdit={
                  onEdit
                }



                onDelete={
                  onDelete
                }



              />


            ))}


          </tbody>


        </table>


      </div>


    </Card>

  );

}


export default VeterinarianTable;