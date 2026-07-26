import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageContainer from "../../components/layout/PageContainer";

import Modal from "../../components/ui/Modal";

import VeterinarianStats from "../../components/veterinarians/VeterinarianStats";
import VeterinarianToolbar from "../../components/veterinarians/VeterinarianToolbar";
import VeterinarianTable from "../../components/veterinarians/VeterinarianTable";
import VeterinarianForm from "../../components/veterinarians/VeterinarianForm";


import {
  getVets,
  createVet,
  updateVet,
} from "../../services/veterinarianService";

import type {
  Veterinarian,
  CreateVeterinarianRequest,
} from "../../types/veterinarian";

function VeterinariansPage() {
  const [veterinarians, setVeterinarians] = useState<
    Veterinarian[]
  >([]);

  const [page, setPage] = useState(0);

  const [size] = useState(20);

  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);

  const [sort, setSort] = useState("name,asc");

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  const [
    selectedVeterinarian,
    setSelectedVeterinarian,
  ] = useState<Veterinarian | null>(null);

  

  const fetchVeterinarians = async () => {
    try {
      setLoading(true);

      const response = await getVets({
        page,
        size,
        sort,
      });

      setVeterinarians(response.content);

      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVeterinarians();
  }, [page, sort]);
    const handleAddVeterinarian = () => {
    setSelectedVeterinarian(null);
    setIsModalOpen(true);
  };

  const handleEditVeterinarian = (
    veterinarian: Veterinarian
  ) => {
    setSelectedVeterinarian(veterinarian);
    setIsModalOpen(true);
  };

  const handleSubmitVeterinarian = async (
    values: CreateVeterinarianRequest
  ) => {
    try {
      if (selectedVeterinarian) {
        await updateVet(
          selectedVeterinarian.id,
          values
        );
      } else {
        await createVet(values);
      }

      await fetchVeterinarians();

      handleCloseModal();
    } catch (error) {
      console.error("Failed to save veterinarian:", error);
    }
  };

  

const handleExportVeterinarians = () => {
  console.log("EXPORT VETERINARIANS:", veterinarians);

  const headers = [
    "ID",
    "Name",
    "Specialty",
    "License Number",
    "Work Hours",
    "Active",
  ];

  const rows = veterinarians.map((vet) => [
    vet.id,
    vet.name,
    vet.specialty,
    vet.licenseNo,
    vet.workHours,
    vet.active ? "Yes" : "No",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "veterinarians-export.csv";

  link.click();

  URL.revokeObjectURL(url);
};



  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVeterinarian(null);
  };
    return (
    <DashboardLayout>
      <PageContainer>
        {/* Page Header */}
        <div className="mb-10 flex items-start justify-between">
  <div>
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

  <button
    type="button"
    onClick={handleAddVeterinarian}
    className="
      flex
      h-11
      items-center
      gap-2
      rounded-xl
      bg-blue-600
      px-5
      text-sm
      font-medium
      text-white
      transition
      hover:bg-blue-700
    "
  >
    <Plus size={18} />
    Add Veterinarian
  </button>
</div>

        {/* Content */}
        
        <div className="space-y-10">
  <div className="space-y-6">
  

  <VeterinarianStats />
</div>

  <VeterinarianToolbar
    sort={sort}
    onSortChange={(value) => {
      setSort(value);
      setPage(0);
    }}
    onExport={handleExportVeterinarians}
  />

  <VeterinarianTable
    veterinarians={veterinarians}
    onEdit={handleEditVeterinarian}
    
  />

  {!loading && totalPages > 1 && (
    <div className="mt-6 flex items-center justify-between">
      <button
        type="button"
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 0}
        className="
          rounded-lg
          border
          border-slate-300
          bg-white
          px-4
          py-2
          text-sm
          font-medium
          text-slate-700
          hover:bg-slate-50
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
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
        className="
          rounded-lg
          border
          border-slate-300
          bg-white
          px-4
          py-2
          text-sm
          font-medium
          text-slate-700
          hover:bg-slate-50
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Next
      </button>
    </div>
  )}
</div>

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
            initialValues={selectedVeterinarian}
            onSubmit={handleSubmitVeterinarian}
            onCancel={handleCloseModal}
          />
        </Modal>

       
      </PageContainer>
    </DashboardLayout>
  );
}

export default VeterinariansPage;