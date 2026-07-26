import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import AppointmentStats from "../../components/appointments/AppointmentStats";
import AppointmentToolbar from "../../components/appointments/AppointmentToolbar";
import AppointmentTable from "../../components/appointments/AppointmentTable";
import AppointmentForm from "../../components/appointments/AppointmentForm";
import UpdateStatusDialog from "../../components/appointments/UpdateStatusDialog";
import MedicalNotesDialog from "../../components/appointments/MedicalNotesDialog";

import Modal from "../../components/ui/Modal";

import {
  getVisits,
  createVisit,
  updateVisit,
  updateVisitStatus,
  updateMedicalNotes,
} from "../../services/visitService";

import { getPets } from "../../services/petService";
import { getVets } from "../../services/veterinarianService";

import type {
  Visit,
  VisitStatus,
  CreateVisitRequest,
  UpdateMedicalNotesRequest,
} from "../../types/visit";

import type { Pet } from "../../types/pet";
import type { Veterinarian } from "../../types/veterinarian";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Visit[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedAppointment, setSelectedAppointment] =
    useState<Visit | null>(null);

  const [statusAppointment, setStatusAppointment] =
    useState<Visit | null>(null);

  const [medicalAppointment, setMedicalAppointment] =
    useState<Visit | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] =
    useState("scheduledAsc");

  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [totalPages, setTotalPages] =
    useState(0);

  const fetchVisits = async () => {
    try {
      setLoading(true);
      setError("");

      let sort: string | undefined;

      switch (sortOption) {
        case "scheduledAsc":
          sort = "scheduledAt,asc";
          break;

        case "scheduledDesc":
          sort = "scheduledAt,desc";
          break;

        case "statusAsc":
          sort = "status,asc";
          break;

        case "statusDesc":
          sort = "status,desc";
          break;

        default:
          sort = undefined;
      }

      const data = await getVisits({
        page,
        size,
        sort,
      });

      let visits = data.content;

      

      setAppointments(visits);
      setTotalPages(data.totalPages);

    } catch (err) {
      console.error(err);
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPets = async () => {
    try {
      const data = await getPets({
        page: 0,
        size: 1000,
      });

      setPets(data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchVets = async () => {
    try {
      const data = await getVets({
        page: 0,
        size: 1000,
      });

      setVeterinarians(data.content);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, [page, size, sortOption, searchTerm]);

  useEffect(() => {
    fetchPets();
    fetchVets();
  }, []);

  const handleAdd = () => {
    setSelectedAppointment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (appointment: Visit) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (
    appointment: Visit
  ) => {
    setStatusAppointment(appointment);
  };

  const handleMedicalNotes = (
    appointment: Visit
  ) => {
    setMedicalAppointment(appointment);
  };

  const handleSubmit = async (
    values: CreateVisitRequest
  ) => {
    try {
      if (selectedAppointment) {
        await updateVisit(
          selectedAppointment.id,
          values
        );
      } else {
        await createVisit(values);
      }

      setIsModalOpen(false);
      setSelectedAppointment(null);

      fetchVisits();

    } catch (err) {
      console.error(err);
    }
  };

  const confirmStatusUpdate = async (
    status: VisitStatus
  ) => {
    if (!statusAppointment) return;

    try {
      await updateVisitStatus(
        statusAppointment.id,
        { status }
      );

      setStatusAppointment(null);

      fetchVisits();

    } catch (err) {
      console.error(err);
    }
  };

  const confirmMedicalNotes = async (
    values: UpdateMedicalNotesRequest
  ) => {
    if (!medicalAppointment) return;

    try {
      await updateMedicalNotes(
        medicalAppointment.id,
        values
      );

      setMedicalAppointment(null);

      fetchVisits();

    } catch (err) {
      console.error(err);
    }
  };

  const handleExportAppointments = () => {
    const headers = [
      "ID",
      "Pet ID",
      "Vet ID",
      "Scheduled At",
      "Status",
      "Chief Complaint",
    ];

    const rows = appointments.map((a) => [
      a.id,
      a.petId,
      a.vetId,
      a.scheduledAt,
      a.status,
      a.chiefComplaint,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = "appointments.csv";
    link.click();

    URL.revokeObjectURL(url);
  };
  const filteredAppointments = appointments.filter(
  (appointment) => {
    const petName =
      pets.find(
        (pet) => pet.id === appointment.petId
      )?.name ?? "";

    const veterinarianName =
      veterinarians.find(
        (vet) => vet.id === appointment.vetId
      )?.name ?? "";

    return (
      petName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      veterinarianName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.chiefComplaint
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }
);
    return (
    <DashboardLayout>
      <div className="space-y-6">

        <div>
  <h1 className="text-3xl font-bold text-slate-900">
    Appointments
  </h1>

  <p className="mt-2 text-slate-500">
    Manage appointments and schedules.
  </p>
</div>

        <AppointmentStats appointments={appointments} />

        <AppointmentToolbar
          onSearch={setSearchTerm}
          onSort={setSortOption}
          onAdd={handleAdd}
          onExport={handleExportAppointments}
        />

        <AppointmentTable
  appointments={filteredAppointments}
  pets={pets}
  veterinarians={veterinarians}
  onEdit={handleEdit}
  onUpdateStatus={handleUpdateStatus}
  onMedicalNotes={handleMedicalNotes}
/>

        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded border px-3 py-2 disabled:opacity-50"
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
              className="rounded border px-3 py-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        <Modal
          open={isModalOpen}
          title={
            selectedAppointment
              ? "Edit Appointment"
              : "Add Appointment"
          }
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAppointment(null);
          }}
        >
          <AppointmentForm
            initialValues={
              selectedAppointment
                ? {
                    petId: selectedAppointment.petId,
                    vetId: selectedAppointment.vetId,
                    scheduledAt:
                      selectedAppointment.scheduledAt,
                    chiefComplaint:
                      selectedAppointment.chiefComplaint,
                  }
                : undefined
            }
            pets={pets}
            veterinarians={veterinarians}
            isLoading={loading}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false);
              setSelectedAppointment(null);
            }}
          />
        </Modal>

        <Modal
          open={statusAppointment !== null}
          title="Update Appointment Status"
          onClose={() => setStatusAppointment(null)}
        >
          {statusAppointment && (
            <UpdateStatusDialog
              initialStatus={statusAppointment.status}
              isLoading={loading}
              onSubmit={confirmStatusUpdate}
              onCancel={() =>
                setStatusAppointment(null)
              }
            />
          )}
        </Modal>

        <Modal
          open={medicalAppointment !== null}
          title="Medical Notes"
          onClose={() =>
            setMedicalAppointment(null)
          }
        >
          {medicalAppointment && (
            <MedicalNotesDialog
              initialValues={{
  diagnosis: medicalAppointment.diagnosis ?? "",
  treatmentNotes: medicalAppointment.treatmentNotes ?? "",
  followUpDate: medicalAppointment.followUpDate,
}}
              isLoading={loading}
              onSubmit={confirmMedicalNotes}
              onCancel={() =>
                setMedicalAppointment(null)
              }
            />
          )}
        </Modal>

        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default AppointmentsPage;