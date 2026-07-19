import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import OwnerStats from "../../components/owners/OwnerStats";
import OwnerToolbar from "../../components/owners/OwnerToolbar";
import OwnerTable from "../../components/owners/OwnerTable";
import OwnerForm from "../../components/owners/OwnerForm";
import DeleteOwnerDialog from "../../components/owners/DeleteOwnerDialog";

import Modal from "../../components/ui/Modal";

import {
  getOwners,
  createOwner,
  updateOwner,
  deleteOwner as deleteOwnerApi,
} from "../../services/ownerService";

import type {
  Owner,
  CreateOwnerRequest,
} from "../../types/owner";



function OwnersPage() {


  const [owners, setOwners] =
    useState<Owner[]>([]);



  const [loading, setLoading] =
    useState(true);



  const [error, setError] =
    useState("");



  const [isModalOpen, setIsModalOpen] =
    useState(false);



  const [selectedOwner, setSelectedOwner] =
    useState<Owner | null>(null);



  const [deleteOwner, setDeleteOwner] =
    useState<Owner | null>(null);



  const [deleteError, setDeleteError] =
    useState("");



  const [searchTerm, setSearchTerm] =
    useState("");



  const [sortOption, setSortOption] =
    useState("nameAsc");

  const [page, setPage] = useState(0);

  const [size] = useState(20);

  const [totalPages, setTotalPages] = useState(0);





  const fetchOwners = async () => {

    try {

      setLoading(true);

      setError("");


      

let sort: string | undefined;

switch (sortOption) {
  case "nameAsc":
    sort = "firstName,asc";
    break;

  case "nameDesc":
    sort = "firstName,desc";
    break;

  case "newest":
    sort = "createdAt,desc";
    break;

  case "oldest":
    sort = "createdAt,asc";
    break;

  default:
    sort = undefined;
}

const data = await getOwners({
  page,
  size,
  search: searchTerm || undefined,
  sort,
});

console.log("OWNERS API DATA:", data);

setOwners(data.content);
setTotalPages(data.totalPages);


    } catch(error) {


      console.error(
        error
      );


      setError(
        "Failed to load owners."
      );


    } finally {


      setLoading(false);

    }

  };





 useEffect(() => {
  fetchOwners();
}, [
  page,
  size,
  searchTerm,
  sortOption,
]);


  const handleExportOwners = () => {
    console.log("EXPORT OWNERS:", owners);


    const headers = [

      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone",

    ];



    const rows = owners.map((owner) => [

      owner.id,

      owner.firstName,

      owner.lastName,

      owner.email,

      owner.phone,

    ]);



    const csvContent = [

      headers.join(","),

      ...rows.map((row) =>
        row.join(",")
      )

    ].join("\n");



    const blob = new Blob(

      [csvContent],

      {
        type:
          "text/csv;charset=utf-8;",
      }

    );



    const url =
      URL.createObjectURL(blob);



    const link =
      document.createElement("a");



    link.href = url;


    link.download =
      "owners-export.csv";



    link.click();



    URL.revokeObjectURL(url);


  };






  const handleAdd = () => {

    setSelectedOwner(null);

    setIsModalOpen(true);

  };





  const handleEdit = (
    owner: Owner
  ) => {

    setSelectedOwner(owner);

    setIsModalOpen(true);

  };





  const handleDelete = (
    owner: Owner
  ) => {

    setDeleteOwner(owner);

  };





  const handleSubmit = async (
    values: CreateOwnerRequest
  ) => {


    try {


      if(selectedOwner) {


        await updateOwner(

          selectedOwner.id,

          values

        );


      } else {


        await createOwner(
          values
        );


      }



      await fetchOwners();



      setIsModalOpen(false);

      setSelectedOwner(null);



    } catch(error) {


      console.error(
        "Save owner error:",
        error
      );


    }

  };





  const confirmDelete = async () => {


    if(!deleteOwner) return;



    try {


      setDeleteError("");



      await deleteOwnerApi(

        deleteOwner.id

      );



      await fetchOwners();



      setDeleteOwner(null);



    } catch(error) {


      console.error(
        "Delete owner error:",
        error
      );



      setDeleteError(
        "This owner cannot be deleted because they have registered pets."
      );


    }

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





        {loading && (

          <div className="text-slate-500">

            Loading owners...

          </div>

        )}






        {error && (

          <div className="text-red-500">

            {error}

          </div>

        )}






        <OwnerToolbar

          onAdd={handleAdd}


          onSearch={(value) =>
            setSearchTerm(value)
          }


          onSort={(value) =>
            setSortOption(value)
          }


          onExport={handleExportOwners}

        />






        {!loading && !error && (
  <>
    <OwnerTable
  owners={owners}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

    {totalPages > 1 && (
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 0}
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-slate-600">
          Page {page + 1} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page + 1 >= totalPages}
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    )}
  </>
)}







        <Modal

          open={isModalOpen}

          title={
            selectedOwner
              ? "Edit Owner"
              : "Add New Owner"
          }

          onClose={() => {

            setIsModalOpen(false);

            setSelectedOwner(null);

          }}

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


            onCancel={() => {

              setIsModalOpen(false);

              setSelectedOwner(null);

            }}

          />


        </Modal>







        <DeleteOwnerDialog


          open={!!deleteOwner}



          ownerName={

            deleteOwner

            ? `${deleteOwner.firstName} ${deleteOwner.lastName}`

            : ""

          }



          errorMessage={deleteError}



          onClose={() => {

            setDeleteOwner(null);

            setDeleteError("");

          }}



          onConfirm={confirmDelete}


        />



      </div>


    </DashboardLayout>

  );

}



export default OwnersPage;