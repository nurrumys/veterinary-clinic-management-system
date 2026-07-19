import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageContainer from "../../components/layout/PageContainer";

import Modal from "../../components/ui/Modal";

import PetStats from "../../components/pets/PetStats";
import PetToolbar from "../../components/pets/PetToolbar";
import PetTable from "../../components/pets/PetTable";
import PetForm from "../../components/pets/PetForm";
import DeletePetDialog from "../../components/pets/DeletePetDialog";

import {
  getPets,
  createPet,
  updatePet,
  archivePet,
  activatePet,
} from "../../services/petService";

import { getOwners } from "../../services/ownerService";

import type {
  CreatePetRequest,
  Pet,
} from "../../types/pet";

import type {
  Owner,
} from "../../types/owner";



function PetsPage() {


  const [pets, setPets] =
    useState<Pet[]>([]);
    const [owners, setOwners] =
  useState<Owner[]>([]);



  const [loading, setLoading] =
    useState(true);



  const [error, setError] =
    useState("");



  const [search, setSearch] =
    useState("");



  const [species, setSpecies] =
    useState("");



  const [owner, setOwner] =
    useState("");



  const [sort, setSort] =
    useState("name-asc");



  const [isModalOpen, setIsModalOpen] =
    useState(false);



  const [selectedPet, setSelectedPet] =
    useState<Pet | null>(null);



  const [petToArchive, setPetToArchive] =
    useState<Pet | null>(null);



  const [showArchived, setShowArchived] =
    useState(false);




  const fetchPets = async () => {


    try {


      setLoading(true);

      setError("");



      const data =
        await getPets(showArchived);



      console.log(
        "PETS API DATA:",
        data
      );



      setPets(
        data.content ?? []
      );



    } catch(error) {


      console.error(error);



      setError(
        "Failed to load pets."
      );



    } finally {


      setLoading(false);


    }


  };
  const fetchOwners = async () => {

  try {

    const data =
      await getOwners();


    setOwners(
      data.content ?? []
    );


  } catch(error) {

    console.error(
      "Owners load error:",
      error
    );

  }

};




  useEffect(() => {

    fetchPets();
    fetchOwners();

  }, [showArchived]);
  const handleExportPets = () => {

  const headers = [
    "ID",
    "Name",
    "Species",
    "Breed",
    "Owner",
  ];


  const rows = filteredPets.map((pet) => [

    pet.id,
    pet.name,
    pet.species,
    pet.breed,
    owners.find(
      (owner) => owner.id === pet.ownerId
    )
      ? `${owners.find(
          (owner) => owner.id === pet.ownerId
        )?.firstName} ${
          owners.find(
            (owner) => owner.id === pet.ownerId
          )?.lastName
        }`
      : "-",

  ]);



  const csvContent = [

    headers.join(","),

    ...rows.map(
      (row) => row.join(",")
    )

  ].join("\n");



  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );


  const url =
    URL.createObjectURL(blob);



  const link =
    document.createElement("a");


  link.href = url;


  link.download =
    "pets-export.csv";


  link.click();



  URL.revokeObjectURL(url);

};

  const filteredPets = [...pets]

    .filter((pet) => {


      const searchValue =
        search.toLowerCase();



      const matchesSearch =
        pet.name
          .toLowerCase()
          .includes(searchValue)

        ||

        pet.species
          .toLowerCase()
          .includes(searchValue)

        ||

        pet.breed
          .toLowerCase()
          .includes(searchValue);



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


      switch(sort) {


        case "name-desc":

          return b.name.localeCompare(
            a.name
          );



        case "newest":

          return (
            new Date(b.createdAt).getTime()
            -
            new Date(a.createdAt).getTime()
          );



        case "oldest":

          return (
            new Date(a.createdAt).getTime()
            -
            new Date(b.createdAt).getTime()
          );



        default:

          return a.name.localeCompare(
            b.name
          );

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








  const handleSubmitPet = async (
    values: CreatePetRequest
  ) => {


    try {


      if(selectedPet) {


        await updatePet(
          selectedPet.id,
          values
        );


      } else {


        console.log(
          "PET FORM VALUES:",
          values
        );


        await createPet(values);


      }



      await fetchPets();



      handleCloseModal();



    } catch(error) {


      console.error(
        "Save pet error:",
        error
      );


    }


  };







  const handleArchivePet = (
    pet: Pet
  ) => {


    setPetToArchive(pet);


  };







  const handleConfirmArchive = async () => {


    if(!petToArchive) return;



    try {


      if(showArchived) {


        await activatePet(
          petToArchive.id
        );


      } else {


        await archivePet(
          petToArchive.id
        );


      }



      await fetchPets();



      setPetToArchive(null);



    } catch(error) {


      console.error(
        "Pet status change error:",
        error
      );


    }


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





        <div className="space-y-8">


          <PetStats />




          {loading && (

            <div className="text-slate-500">

              Loading pets...

            </div>

          )}





          {error && (

            <div className="text-red-500">

              {error}

            </div>

          )}







          {/* Active / Archived Tabs */}

<div
  className="
    flex
    w-fit
    rounded-xl
    border
    border-slate-200
    bg-white
    p-1
    shadow-sm
    mb-2
  "
>

  <button
    type="button"
    onClick={() =>
      setShowArchived(false)
    }
    className={`
      rounded-xl
      px-6
      py-2.5
      text-sm
      font-semibold
      transition
      ${
        !showArchived
          ? "bg-blue-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100"
      }
    `}
  >
    Active Pets
  </button>



  <button
    type="button"
    onClick={() =>
      setShowArchived(true)
    }
    className={`
      rounded-xl
      px-6
      py-2.5
      text-sm
      font-semibold
      transition
      ${
        showArchived
          ? "bg-blue-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100"
      }
    `}
  >
    Archived Pets
  </button>


</div>









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

  onExport={handleExportPets}

/>











          {!loading && !error && (

            <PetTable

  pets={filteredPets}

  owners={owners}

  onEdit={handleEditPet}

  onDelete={handleArchivePet}

/>

          )}





        </div>









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



            isLoading={loading}



            mode={
              selectedPet
                ? "edit"
                : "create"
            }



            onSubmit={handleSubmitPet}



            onCancel={handleCloseModal}


          />


        </Modal>









        <DeletePetDialog


          open={!!petToArchive}



          petName={
            petToArchive
              ? petToArchive.name
              : ""
          }



          onClose={() =>
            setPetToArchive(null)
          }



          onConfirm={handleConfirmArchive}



          mode={
            showArchived
              ? "restore"
              : "archive"
          }


        />




      </PageContainer>


    </DashboardLayout>

  );

}



export default PetsPage;