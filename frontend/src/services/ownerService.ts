import api from "./api";

import type {
  Owner,
  CreateOwnerRequest,
  UpdateOwnerRequest,
} from "../types/owner";

export type OwnerPageResponse = {
  content: Owner[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type GetOwnersParams = {
  page?: number;
  size?: number;
  search?: string;
  sort?: string;
};

export const getOwners = async (
  params?: GetOwnersParams
) => {

  const response = await api.get<OwnerPageResponse>(
    "/owners",
    {
      params,
    }
  );

  return response.data;
};

export const getOwnerById = async (
  id: number
) => {

  const response = await api.get<Owner>(
    `/owners/${id}`
  );

  return response.data;
};

export const createOwner = async (
  data: CreateOwnerRequest
) => {

  const response = await api.post<Owner>(
    "/owners",
    data
  );

  return response.data;
};

export const updateOwner = async (
  id: number,
  data: UpdateOwnerRequest
) => {

  const response = await api.put<Owner>(
    `/owners/${id}`,
    data
  );

  return response.data;
};

export const deleteOwner = async (
  id: number
) => {

  await api.delete(
    `/owners/${id}`
  );

};