import api from "./api";

import type { Owner, CreateOwnerRequest } from "../types/owner";

export const getOwners = async () => {
  const response = await api.get<Owner[]>("/owners");
  return response.data;
};

export const createOwner = async (data: CreateOwnerRequest) => {
  const response = await api.post<Owner>("/owners", data);
  return response.data;
};