import type { Veterinarian } from "../types/veterinarian";


export const veterinarians: Veterinarian[] = [

  {
    id: 1,
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@pawcare.com",
    phone: "+48 555 123 456",
    specialization: "Surgery",
    licenseNumber: "VET-2024-001",
    status: "ACTIVE",
    createdAt: "2026-01-10",
    updatedAt: "2026-07-10",
  },


  {
    id: 2,
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@pawcare.com",
    phone: "+48 555 987 654",
    specialization: "Dentistry",
    licenseNumber: "VET-2024-002",
    status: "ACTIVE",
    createdAt: "2026-02-15",
    updatedAt: "2026-07-08",
  },


  {
    id: 3,
    firstName: "Sophia",
    lastName: "Wilson",
    email: "sophia.wilson@pawcare.com",
    phone: "+48 555 456 789",
    specialization: "Dermatology",
    licenseNumber: "VET-2024-003",
    status: "ON_LEAVE",
    createdAt: "2026-03-20",
    updatedAt: "2026-07-05",
  },


  {
    id: 4,
    firstName: "Daniel",
    lastName: "Taylor",
    email: "daniel.taylor@pawcare.com",
    phone: "+48 555 654 321",
    specialization: "General Medicine",
    licenseNumber: "VET-2024-004",
    status: "ACTIVE",
    createdAt: "2026-04-01",
    updatedAt: "2026-07-12",
  },


];