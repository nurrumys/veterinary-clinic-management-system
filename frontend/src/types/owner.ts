import type { Pet } from "./pet";

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

export type OwnerDetail = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  petCount: number;
  pets: Pet[];
  createdAt: string;
  updatedAt: string;
};