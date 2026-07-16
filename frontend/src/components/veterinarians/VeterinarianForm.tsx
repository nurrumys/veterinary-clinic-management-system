import { useEffect } from "react";

import {
  useForm,
} from "react-hook-form";

import type {
  CreateVeterinarianRequest,
  Veterinarian,
} from "../../types/veterinarian";



type VeterinarianFormProps = {

  initialValues?: Veterinarian | null;

  onSubmit: (
    values: CreateVeterinarianRequest
  ) => void;

  onCancel: () => void;

};





function VeterinarianForm({

  initialValues,

  onSubmit,

  onCancel,

}: VeterinarianFormProps) {



  const {
    register,
    handleSubmit,
    reset,

  } = useForm<CreateVeterinarianRequest>({

    defaultValues: {

      firstName: "",

      lastName: "",

      email: "",

      phone: "",

      specialization: "",

      licenseNumber: "",

    },

  });









  useEffect(() => {


    if (initialValues) {


      reset({

        firstName:
          initialValues.firstName,


        lastName:
          initialValues.lastName,


        email:
          initialValues.email,


        phone:
          initialValues.phone,


        specialization:
          initialValues.specialization,


        licenseNumber:
          initialValues.licenseNumber,


      });


    } else {


      reset({

        firstName: "",

        lastName: "",

        email: "",

        phone: "",

        specialization: "",

        licenseNumber: "",

      });


    }



  }, [
    initialValues,
    reset,
  ]);









  return (

    <form

      onSubmit={
        handleSubmit(onSubmit)
      }

      className="
        space-y-6
      "

    >







      <div
        className="
          grid
          grid-cols-2
          gap-5
        "
      >




        {/* First Name */}

        <div>


          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-700
            "
          >

            First Name

          </label>



          <input

            {...register(
              "firstName"
            )}

            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "

            placeholder="Enter first name"

          />


        </div>







        {/* Last Name */}

        <div>


          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-700
            "
          >

            Last Name

          </label>



          <input

            {...register(
              "lastName"
            )}

            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "

            placeholder="Enter last name"

          />


        </div>



      </div>









      {/* Email */}

      <div>


        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
          "
        >

          Email

        </label>



        <input

          {...register(
            "email"
          )}

          type="email"

          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            focus:border-blue-500
          "

          placeholder="Enter email"

        />


      </div>









      {/* Phone */}

      <div>


        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
          "
        >

          Phone

        </label>



        <input

          {...register(
            "phone"
          )}

          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            focus:border-blue-500
          "

          placeholder="Enter phone number"

        />


      </div>









      <div
        className="
          grid
          grid-cols-2
          gap-5
        "
      >




        {/* Specialty */}

        <div>


          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-700
            "
          >

            Specialty

          </label>



          <input

            {...register(
              "specialization"
            )}

            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "

            placeholder="Enter specialty"

          />


        </div>








        {/* License */}

        <div>


          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-700
            "
          >

            License Number

          </label>



          <input

            {...register(
              "licenseNumber"
            )}

            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "

            placeholder="VET-2024-001"

          />


        </div>



      </div>









      {/* Buttons */}

      <div
        className="
          flex
          justify-end
          gap-4
          pt-5
        "
      >



        <button

          type="button"

          onClick={onCancel}

          className="
            rounded-xl
            border
            border-slate-300
            px-5
            py-3
            font-medium
            text-slate-700
            transition
            hover:bg-slate-100
          "

        >

          Cancel

        </button>





        <button

          type="submit"

          className="
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-blue-700
          "

        >

          Save Veterinarian

        </button>




      </div>





    </form>

  );

}



export default VeterinarianForm;