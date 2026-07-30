import type { VisitStatus } from "./visit";

export interface OwnerSearchResult {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface PetSearchResult {
  id: number;
  name: string;
  species: string;
  ownerId: number;
  ownerName: string;
}

export interface VisitSearchResult {
  id: number;
  scheduledAt: string;
  status: VisitStatus;
  petId: number;
  petName: string;
}

export interface SearchResponse {
  owners: OwnerSearchResult[];
  pets: PetSearchResult[];
  visits: VisitSearchResult[];
}