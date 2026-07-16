import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageContainer from "../../components/layout/PageContainer";

import Modal from "../../components/ui/Modal";

import VeterinarianStats from "../../components/veterinarians/VeterinarianStats";
import VeterinarianToolbar from "../../components/veterinarians/VeterinarianToolbar";
import VeterinarianTable from "../../components/veterinarians/VeterinarianTable";
import VeterinarianForm from "../../components/veterinarians/VeterinarianForm";
import DeleteVeterinarianDialog from "../../components/veterinarians/DeleteVeterinarianDialog";

import type {
  Veterinarian,
  CreateVeterinarianRequest,
} from "../../types/veterinarian";




function VeterinariansPage() {



  const [search, setSearch] = useState("");

  const [specialty, setSpecialty] = useState("");

  const [status, setStatus] = useState("");

  const [sort, setSort] = useState("name-asc");




  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);





  const [
    selectedVeterinarian,
    setSelectedVeterinarian,
  ] = useState<Veterinarian | null>(null);





  const [
    deleteVeterinarian,
    setDeleteVeterinarian,
  ] = useState<Veterinarian | null>(null);









  const handleAddVeterinarian = () => {


    setSelectedVeterinarian(null);

    setIsModalOpen(true);


  };









  const handleEditVeterinarian = (

    veterinarian: Veterinarian

  ) => {


    setSelectedVeterinarian(
      veterinarian
    );


    setIsModalOpen(true);


  };









  const handleSubmitVeterinarian = (

    values: CreateVeterinarianRequest

  ) => {


    if (selectedVeterinarian) {


      console.log(
        "Update veterinarian:",
        selectedVeterinarian,
        values
      );


      // API later
      // veterinarianService.update(
      // selectedVeterinarian.id,
      // values
      // )


    } else {


      console.log(
        "Create veterinarian:",
        values
      );


      // API later
      // veterinarianService.create(values)


    }



    handleCloseModal();


  };









  const handleDeleteVeterinarian = (

    veterinarian: Veterinarian

  ) => {


    setDeleteVeterinarian(
      veterinarian
    );


  };









  const handleConfirmDelete = () => {


    if (!deleteVeterinarian) return;



    console.log(
      "Delete veterinarian:",
      deleteVeterinarian
    );



    // API later
    // veterinarianService.delete(
    // deleteVeterinarian.id
    // )



    setDeleteVeterinarian(null);


  };









  const handleCloseModal = () => {


    setIsModalOpen(false);


    setSelectedVeterinarian(null);


  };









  return (

    <DashboardLayout>


      <PageContainer>





        {/* Page Header */}


        <div
          className="
            mb-10
          "
        >


          <h1
            className="
              text-4xl
              font-bold
              tracking-tight
              text-slate-900
            "
          >

            Veterinarians

          </h1>




          <p
            className="
              mt-3
              text-base
              text-slate-500
            "
          >

            Manage veterinarians and their information.

          </p>



        </div>









        {/* Content */}


        <div
          className="
            space-y-10
          "
        >



          <VeterinarianStats />





          <VeterinarianToolbar


            search={search}

            specialty={specialty}

            status={status}

            sort={sort}



            onSearchChange={setSearch}

            onSpecialtyChange={setSpecialty}

            onStatusChange={setStatus}

            onSortChange={setSort}



            onAddVeterinarian={
              handleAddVeterinarian
            }


          />









          <VeterinarianTable


            onEdit={
              handleEditVeterinarian
            }


            onDelete={
              handleDeleteVeterinarian
            }


          />



        </div>









        {/* Add / Edit Veterinarian Modal */}



        <Modal


          open={isModalOpen}


          title={

            selectedVeterinarian

              ? "Edit Veterinarian"

              : "Add New Veterinarian"

          }


          onClose={handleCloseModal}


        >



          <VeterinarianForm


            initialValues={
              selectedVeterinarian
            }


            onSubmit={
              handleSubmitVeterinarian
            }


            onCancel={
              handleCloseModal
            }


          />



        </Modal>









        {/* Delete Veterinarian Dialog */}



        <DeleteVeterinarianDialog


          open={
            !!deleteVeterinarian
          }



          veterinarianName={

            deleteVeterinarian

              ? `${deleteVeterinarian.firstName} ${deleteVeterinarian.lastName}`

              : ""

          }




          onClose={() =>
            setDeleteVeterinarian(null)
          }



          onConfirm={
            handleConfirmDelete
          }



        />





      </PageContainer>


    </DashboardLayout>

  );

}



export default VeterinariansPage;