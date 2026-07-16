export type Veterinarian = {
  id: number;

  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  specialization: string;

  licenseNumber: string;

  status:
    | "ACTIVE"
    | "INACTIVE"
    | "ON_LEAVE";

  createdAt: string;
  updatedAt: string;
};



export type CreateVeterinarianRequest = {
  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  specialization: string;

  licenseNumber: string;
};



export type UpdateVeterinarianRequest =
  CreateVeterinarianRequest;