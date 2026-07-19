import type { Veterinarian } from "../types/veterinarian";

export const veterinarians: Veterinarian[] = [
  {
    id: 1,
    name: "Emily Johnson",
    specialty: "Surgery",
    licenseNo: "VET-2024-001",
    workHours: "09:00 - 17:00",
    active: true,
    createdAt: "2026-01-10",
    updatedAt: "2026-07-10",
  },

  {
    id: 2,
    name: "Michael Brown",
    specialty: "Dentistry",
    licenseNo: "VET-2024-002",
    workHours: "08:00 - 16:00",
    active: true,
    createdAt: "2026-02-15",
    updatedAt: "2026-07-08",
  },

  {
    id: 3,
    name: "Sophia Wilson",
    specialty: "Dermatology",
    licenseNo: "VET-2024-003",
    workHours: "10:00 - 18:00",
    active: false,
    createdAt: "2026-03-20",
    updatedAt: "2026-07-05",
  },

  {
    id: 4,
    name: "Daniel Taylor",
    specialty: "General Medicine",
    licenseNo: "VET-2024-004",
    workHours: "09:30 - 17:30",
    active: true,
    createdAt: "2026-04-01",
    updatedAt: "2026-07-12",
  },
];