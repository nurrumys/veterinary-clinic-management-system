import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import OwnerStats from "../../components/owners/OwnerStats";
import OwnerToolbar from "../../components/owners/OwnerToolbar";
import OwnerTable from "../../components/owners/OwnerTable";
import OwnerForm from "../../components/owners/OwnerForm";
import DeleteOwnerDialog from "../../components/owners/DeleteOwnerDialog";

import Modal from "../../components/ui/Modal";

import type {
  Owner,
  CreateOwnerRequest,
} from "../../types/owner";



function OwnersPage() {


  const [isModalOpen, setIsModalOpen] =
    useState(false);



  const [selectedOwner, setSelectedOwner] =
    useState<Owner | null>(null);



  const [deleteOwner, setDeleteOwner] =
    useState<Owner | null>(null);



  const [searchTerm, setSearchTerm] =
    useState("");



  const [sortOption, setSortOption] =
    useState("nameAsc");







  const handleAdd = () => {

    setSelectedOwner(null);

    setIsModalOpen(true);

  };








  const handleEdit = (owner: Owner) => {

    setSelectedOwner(owner);

    setIsModalOpen(true);

  };








  const handleDelete = (owner: Owner) => {

    setDeleteOwner(owner);

  };








  const handleSubmit = (
    values: CreateOwnerRequest
  ) => {



    if (selectedOwner) {


      console.log(
        "Update owner:",
        values
      );


    } else {


      console.log(
        "Create owner:",
        values
      );


    }



    setIsModalOpen(false);


  };









  return (


    <DashboardLayout>



      <div className="space-y-8">





        <div>


          <h1
            className="
              text-3xl
              font-bold
              text-slate-900
            "
          >

            Owners

          </h1>




          <p
            className="
              mt-2
              text-slate-500
            "
          >

            Manage pet owners and their information.

          </p>



        </div>








        <OwnerStats />









        <OwnerToolbar


          onAdd={handleAdd}



          onSearch={(value) =>
            setSearchTerm(value)
          }



          onSort={(value) =>
            setSortOption(value)
          }



        />









        <OwnerTable



          onEdit={handleEdit}



          onDelete={handleDelete}



          searchTerm={searchTerm}



          sortOption={sortOption}



        />









        <Modal



          open={isModalOpen}



          title={
            selectedOwner
              ? "Edit Owner"
              : "Add New Owner"
          }



          onClose={() =>
            setIsModalOpen(false)
          }



        >





          <OwnerForm



            initialValues={

              selectedOwner

              ? {

                  firstName:
                    selectedOwner.firstName,


                  lastName:
                    selectedOwner.lastName,


                  email:
                    selectedOwner.email,


                  phone:
                    selectedOwner.phone,


                  address:
                    selectedOwner.address,


                }


              : undefined

            }





            onSubmit={handleSubmit}





            onCancel={() =>
              setIsModalOpen(false)
            }




          />



        </Modal>









        <DeleteOwnerDialog



          open={
            deleteOwner !== null
          }



          ownerName={

            deleteOwner

            ? `${deleteOwner.firstName} ${deleteOwner.lastName}`

            : ""

          }





          onClose={() =>
            setDeleteOwner(null)
          }





          onConfirm={() => {


            console.log(
              "Confirmed delete:",
              deleteOwner
            );



            setDeleteOwner(null);



          }}



        />







      </div>





    </DashboardLayout>


  );

}



export default OwnersPage;