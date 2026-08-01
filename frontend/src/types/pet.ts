export type Pet = {
  id: number;
  ownerId: number;

  name: string;
  species: string;
  breed: string;
  speciesNote: string | null;

  birthDate: string;
  sex: string;
  weightKg: number;

  allergies: string | null;
  chronicConditions: string | null;

  archived: boolean;
  inactive: boolean;

  createdAt: string;
  updatedAt: string;
};

export type CreatePetRequest = {
  ownerId: number;

  name: string;
  species: string;
  breed: string;
  speciesNote: string | null;

  birthDate: string;
  sex: string;
  weightKg: number;

  allergies: string | null;
  chronicConditions: string | null;
};

export type UpdatePetRequest = CreatePetRequest;

export type PetStatsResponse = {
  totalPets: number;
  dogs: number;
  cats: number;
  newThisMonth: number;
};