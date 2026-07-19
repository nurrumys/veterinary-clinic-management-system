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