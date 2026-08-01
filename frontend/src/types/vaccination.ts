export interface Vaccination {
  id: number;

  petId: number;

  vaccineType: string;

  administeredAt: string;

  lotNumber: string;

  nextDueDate: string;

  administeredBy: string;

  createdAt: string;

  updatedAt: string;
}


export interface CreateVaccinationRequest {
  petId: number;

  vaccineType: string;

  administeredAt: string;

  lotNumber: string;

  administeredBy: string;
}


export type UpdateVaccinationRequest =
  CreateVaccinationRequest;



// Statistics cards
export interface VaccinationStats {
  totalVaccinations: number;

  administeredToday: number;

  upcomingDue: number;

  vaccinatedPets: number;
}