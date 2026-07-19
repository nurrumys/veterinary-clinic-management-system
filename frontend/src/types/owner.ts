export type Owner = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  petCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateOwnerRequest = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
};

export type UpdateOwnerRequest = CreateOwnerRequest;