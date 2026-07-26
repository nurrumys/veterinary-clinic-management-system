export type Veterinarian = {
  id: number;

  name: string;

  specialty: string;

  licenseNo: string;

  workHours: string;

  active: boolean;

  createdAt: string;
  updatedAt: string;
};

export type CreateVeterinarianRequest = {
  name: string;

  specialty: string;

  licenseNo: string;

  workHours: string;
};

export type UpdateVeterinarianRequest =
  CreateVeterinarianRequest;