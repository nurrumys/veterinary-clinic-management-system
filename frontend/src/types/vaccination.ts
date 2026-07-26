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

export interface UpdateVaccinationRequest {
  petId: number;
  vaccineType: string;
  administeredAt: string;
  lotNumber: string;
  administeredBy: string;
}