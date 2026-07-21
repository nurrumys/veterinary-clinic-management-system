import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageContainer from "../../components/layout/PageContainer";

import Modal from "../../components/ui/Modal";

import VaccinationStats from "../../components/vaccinations/VaccinationStats";
import VaccinationToolbar from "../../components/vaccinations/VaccinationToolbar";
import VaccinationTable from "../../components/vaccinations/VaccinationTable";
import VaccinationForm from "../../components/vaccinations/VaccinationForm";
import DeleteVaccinationDialog from "../../components/vaccinations/DeleteVaccinationDialog";

import {
  getVaccinations,
  createVaccination,
  updateVaccination,
  deleteVaccination,
} from "../../services/vaccinationService";

import { getPets } from "../../services/petService";

import type {
  Vaccination,
  CreateVaccinationRequest,
} from "../../types/vaccination";

import type { Pet } from "../../types/pet";
function VaccinationsPage() {
  const [search, setSearch] = useState("");
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);

  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sort, setSort] = useState("administeredAt,desc");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedVaccination, setSelectedVaccination] =
    useState<Vaccination | null>(null);

  const [vaccinationToDelete, setVaccinationToDelete] =
    useState<Vaccination | null>(null);
    const fetchVaccinations = async () => {
  try {
    setLoading(true);
    setError("");

    let sortOption;

    switch (sort) {
      case "administeredDesc":
        sortOption = "administeredAt,desc";
        break;

      case "administeredAsc":
        sortOption = "administeredAt,asc";
        break;

      case "vaccineAsc":
        sortOption = "vaccineType,asc";
        break;

      case "vaccineDesc":
        sortOption = "vaccineType,desc";
        break;

      default:
        sortOption = "administeredAt,desc";
    }

    const data = await getVaccinations({
      page,
      size,
      sort: sortOption,
    });

    console.log(
      "VACCINATIONS API DATA:",
      data
    );

    setVaccinations(data.content ?? []);
    setTotalPages(data.totalPages);
  } catch (error) {
    console.error(error);

    setError(
      "Failed to load vaccinations."
    );
  } finally {
    setLoading(false);
  }
};
const fetchPets = async () => {
  try {
    const data = await getPets();

    setPets(
      data.content ?? []
    );
  } catch (error) {
    console.error(
      "Pets load error:",
      error
    );
  }
};
useEffect(() => {
  fetchVaccinations();
}, [
  page,
  size,
  sort,
]);

useEffect(() => {
  fetchPets();
}, []);
const handleAddVaccination = () => {
  setSelectedVaccination(null);
  setIsModalOpen(true);
};
const handleEditVaccination = (
  vaccination: Vaccination
) => {
  setSelectedVaccination(vaccination);
  setIsModalOpen(true);
};
const handleCloseModal = () => {
  setIsModalOpen(false);
  setSelectedVaccination(null);
};
const filteredVaccinations = vaccinations.filter(
  (vaccination) => {
    const petName =
      pets.find(
        (pet) => pet.id === vaccination.petId
      )?.name ?? "";

    return (
      petName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      vaccination.vaccineType
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }
);
const handleSubmitVaccination = async (
  values: CreateVaccinationRequest
) => {
  try {
    if (selectedVaccination) {
      await updateVaccination(
        selectedVaccination.id,
        values
      );
    } else {
      await createVaccination(values);
    }

    await fetchVaccinations();

    handleCloseModal();
  } catch (error) {
    console.error(
      "Save vaccination error:",
      error
    );
  }
};
const handleDeleteVaccination = async () => {
  if (!vaccinationToDelete) {
    return;
  }

  try {
    await deleteVaccination(
      vaccinationToDelete.id
    );

    await fetchVaccinations();

    setVaccinationToDelete(null);
  } catch (error) {
    console.error(
      "Delete vaccination error:",
      error
    );
  }
};
const handleExportVaccinations = () => {
  const headers = [
    "ID",
    "Pet",
    "Vaccine Type",
    "Administered At",
    "Next Due Date",
    "Administered By",
  ];

  const rows = vaccinations.map(
    (vaccination) => [
      vaccination.id,
      pets.find(
        (pet) => pet.id === vaccination.petId
      )?.name ?? "-",
      vaccination.vaccineType,
      vaccination.administeredAt,
      vaccination.nextDueDate,
      vaccination.administeredBy ?? "-",
    ]
  );

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
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
    "vaccinations-export.csv";

  link.click();

  URL.revokeObjectURL(url);
};
return (
  <DashboardLayout>
    <PageContainer>
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-slate-900">
      Vaccinations
    </h1>

    <p className="mt-2 text-slate-500">
      Manage vaccination records for your patients.
    </p>
  </div>
      <VaccinationStats
        vaccinations={vaccinations}
      />

      <div className="mt-8">
        <VaccinationToolbar
          onSearch={setSearch}
          onSort={setSort}
          onAdd={handleAddVaccination}
          onExport={handleExportVaccinations}
        />
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500">
          Loading vaccinations...
        </div>
      ) : error ? (
        <div className="py-16 text-center text-red-500">
          {error}
        </div>
      ) : (
        <VaccinationTable
          vaccinations={filteredVaccinations}
          pets={pets}
          onEdit={handleEditVaccination}
          onDelete={setVaccinationToDelete}
        />
      )}
            <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={
          selectedVaccination
            ? "Edit Vaccination"
            : "Add Vaccination"
        }
      >
        {totalPages > 1 && (
  <div className="mt-6 flex items-center justify-between">
    <button
      type="button"
      disabled={page === 0}
      onClick={() => setPage((prev) => prev - 1)}
      className="rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-50"
    >
      Previous
    </button>

    <span className="text-sm text-slate-600">
      Page {page + 1} of {totalPages}
    </span>

    <button
      type="button"
      disabled={page + 1 >= totalPages}
      onClick={() => setPage((prev) => prev + 1)}
      className="rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}
        <VaccinationForm
  initialValues={
    selectedVaccination
      ? {
          petId: selectedVaccination.petId,
          vaccineType: selectedVaccination.vaccineType,
          administeredAt: selectedVaccination.administeredAt,
          lotNumber: selectedVaccination.lotNumber,
          administeredBy: selectedVaccination.administeredBy,
        }
      : undefined
  }
  mode={
    selectedVaccination
      ? "edit"
      : "create"
  }
  onSubmit={handleSubmitVaccination}
  onCancel={handleCloseModal}
/>
      </Modal>

      <DeleteVaccinationDialog
  open={vaccinationToDelete !== null}
  vaccination={vaccinationToDelete}
  onClose={() => {
    setVaccinationToDelete(null);
  }}
  onConfirm={handleDeleteVaccination}
/>
    </PageContainer>
  </DashboardLayout>
);
}

export default VaccinationsPage;
