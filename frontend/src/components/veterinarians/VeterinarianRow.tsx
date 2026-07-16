import VeterinarianActions from "./VeterinarianActions";

import type { Veterinarian } from "../../types/veterinarian";


type VeterinarianRowProps = {

  veterinarian: Veterinarian;

  onEdit: (
    veterinarian: Veterinarian
  ) => void;


  onDelete: (
    veterinarian: Veterinarian
  ) => void;

};




function VeterinarianRow({

  veterinarian,

  onEdit,

  onDelete,

}: VeterinarianRowProps) {



  return (

    <tr
      className="
        border-b
        border-slate-100
        transition
        hover:bg-slate-50
      "
    >





      {/* Name */}

      <td
        className="
          px-6
          py-5
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >


          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-blue-100
              font-semibold
              text-blue-600
            "
          >

            {veterinarian.firstName[0]}

            {veterinarian.lastName[0]}

          </div>





          <div>

            <p
              className="
                font-semibold
                text-slate-900
              "
            >

              {veterinarian.firstName}{" "}

              {veterinarian.lastName}

            </p>




            <p
              className="
                text-sm
                text-slate-500
              "
            >

              ID #{veterinarian.id}

            </p>


          </div>


        </div>


      </td>








      {/* Email */}

      <td
        className="
          px-6
          py-5
          overflow-hidden
          truncate
          whitespace-nowrap
          text-slate-600
        "
      >

        {veterinarian.email}

      </td>









      {/* Phone */}

      <td
        className="
          px-6
          py-5
          whitespace-nowrap
          text-slate-600
        "
      >

        {veterinarian.phone}

      </td>









      {/* Specialty */}

      <td
        className="
          px-6
          py-5
          overflow-hidden
          truncate
          whitespace-nowrap
          text-slate-600
        "
      >

        {veterinarian.specialization}

      </td>









      {/* License */}

      <td
        className="
          px-6
          py-5
          overflow-hidden
          truncate
          whitespace-nowrap
          text-slate-600
        "
      >

        {veterinarian.licenseNumber}

      </td>









      {/* Status */}

      <td
        className="
          px-6
          py-5
        "
      >

        <span
          className={`

            inline-flex

            whitespace-nowrap

            rounded-full

            px-3

            py-1

            text-xs

            font-medium


            ${
              veterinarian.status === "ACTIVE"

                ? "bg-green-100 text-green-700"

                :

              veterinarian.status === "ON_LEAVE"

                ? "bg-yellow-100 text-yellow-700"

                :

                "bg-red-100 text-red-700"

            }

          `}
        >

          {veterinarian.status.replace("_", " ")}

        </span>


      </td>









      {/* Actions */}

      <td
        className="
          w-[150px]
          px-6
          py-5
        "
      >


        <VeterinarianActions


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


      </td>





    </tr>

  );

}



export default VeterinarianRow;