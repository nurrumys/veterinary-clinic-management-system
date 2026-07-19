import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageContainer from "../../components/layout/PageContainer";

import Modal from "../../components/ui/Modal";

import PetStats from "../../components/pets/PetStats";
import PetToolbar from "../../components/pets/PetToolbar";
import PetTable from "../../components/pets/PetTable";
import PetForm from "../../components/pets/PetForm";
import DeletePetDialog from "../../components/pets/DeletePetDialog";

import { pets } from "../../mocks/pets";

import type {
  CreatePetRequest,
  Pet,
} from "../../types/pet";



function PetsPage() {


  const [search, setSearch] = useState("");

  const [species, setSpecies] = useState("");

  const [owner, setOwner] = useState("");

  const [sort, setSort] = useState("name-asc");



  const [isModalOpen, setIsModalOpen] =
    useState(false);



  const [selectedPet, setSelectedPet] =
    useState<Pet | null>(null);



  const [deletePet, setDeletePet] =
    useState<Pet | null>(null);







  const filteredPets = [...pets]

    .filter((pet) => {


      const searchValue =
        search.toLowerCase();



      const matchesSearch =
        pet.name.toLowerCase().includes(searchValue) ||
        pet.species.toLowerCase().includes(searchValue) ||
        pet.breed.toLowerCase().includes(searchValue);



      const matchesSpecies =
        species === "" ||
        pet.species === species;



      const matchesOwner =
        owner === "" ||
        String(pet.ownerId) === owner;



      return (
        matchesSearch &&
        matchesSpecies &&
        matchesOwner
      );


    })

    .sort((a, b) => {


      switch (sort) {


        case "name-desc":

          return b.name.localeCompare(a.name);



        case "newest":

          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );



        case "oldest":

          return (
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
          );



        default:

          return a.name.localeCompare(b.name);


      }


    });








  const handleAddPet = () => {

    setSelectedPet(null);

    setIsModalOpen(true);

  };







  const handleEditPet = (
    pet: Pet
  ) => {

    setSelectedPet(pet);

    setIsModalOpen(true);

  };







  const handleCloseModal = () => {

    setIsModalOpen(false);

    setSelectedPet(null);

  };








  const handleSubmitPet = (
    values: CreatePetRequest
  ) => {


    if (selectedPet) {


      console.log(
        "Update pet:",
        selectedPet,
        values
      );


    } else {


      console.log(
        "Create pet:",
        values
      );


    }



    handleCloseModal();


  };








  const handleDeletePet = (
    pet: Pet
  ) => {

    setDeletePet(pet);

  };








  const handleConfirmDelete = () => {


    if (!deletePet) return;



    console.log(
      "Delete pet:",
      deletePet
    );



    setDeletePet(null);


  };









  return (

    <DashboardLayout>


      <PageContainer>


        <div className="mb-8">


          <h1
            className="
              text-3xl
              font-bold
              tracking-tight
              text-slate-900
            "
          >
            Pets
          </h1>



          <p
            className="
              mt-3
              text-base
              text-slate-500
            "
          >
            Manage pets, medical records and owner information from one place.
          </p>


        </div>








        <div className="space-y-10">


          <PetStats />





          <PetToolbar

            search={search}

            species={species}

            owner={owner}

            sort={sort}



            onSearchChange={setSearch}

            onSpeciesChange={setSpecies}

            onOwnerChange={setOwner}

            onSortChange={setSort}



            onAddPet={handleAddPet}

          />








          <PetTable

            pets={filteredPets}

            onEdit={handleEditPet}

            onDelete={handleDeletePet}

          />



        </div>









        {/* Add / Edit Pet Modal */}


        <Modal


          open={isModalOpen}


          title={
            selectedPet
              ? "Edit Pet"
              : "Add New Pet"
          }


          onClose={handleCloseModal}


        >



          <PetForm



            initialValues={

              selectedPet

                ? {


                    ownerId:
                      selectedPet.ownerId,


                    name:
                      selectedPet.name,


                    species:
                      selectedPet.species,


                    breed:
                      selectedPet.breed,


                    speciesNote:
                      selectedPet.speciesNote ?? "",


                    birthDate:
                      selectedPet.birthDate,


                    sex:
                      selectedPet.sex,


                    weightKg:
                      selectedPet.weightKg,


                    allergies:
                      selectedPet.allergies ?? "",


                    chronicConditions:
                      selectedPet.chronicConditions ?? "",


                  }


                : undefined

            }



            onSubmit={handleSubmitPet}



            onCancel={handleCloseModal}


          />



        </Modal>









        {/* Delete Pet Dialog */}


        <DeletePetDialog



          open={
            !!deletePet
          }



          petName={

            deletePet

              ? deletePet.name

              : ""

          }



          onClose={() =>
            setDeletePet(null)
          }



          onConfirm={
            handleConfirmDelete
          }



        />



      </PageContainer>


    </DashboardLayout>

  );

}



export default PetsPage;