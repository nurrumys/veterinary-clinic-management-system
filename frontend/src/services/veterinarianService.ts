import api from "./api";

import type {
  Veterinarian,
  CreateVeterinarianRequest,
  UpdateVeterinarianRequest,
} from "../types/veterinarian";

export type VetPageResponse = {
  content: Veterinarian[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type GetVetsParams = {
  page?: number;
  size?: number;
  sort?: string;
};

export const getVets = async (
  params?: GetVetsParams
) => {
  const response = await api.get<VetPageResponse>(
    "/vets",
    {
      params,
    }
  );

  return response.data;
};

export const getVetById = async (
  id: number
) => {
  const response = await api.get<Veterinarian>(
    `/vets/${id}`
  );

  return response.data;
};

export const createVet = async (
  data: CreateVeterinarianRequest
) => {
  const response = await api.post<Veterinarian>(
    "/vets",
    data
  );

  return response.data;
};

export const updateVet = async (
  id: number,
  data: UpdateVeterinarianRequest
) => {
  const response = await api.put<Veterinarian>(
    `/vets/${id}`,
    data
  );

  return response.data;
};

/*
  Backend'de ileride kullanılabilecek endpoint.
  VetPerformanceResponse DTO'sunu gördükten sonra
  TypeScript type'ını oluşturacağız.
*/
export const getVetPerformance = async (
  id: number
) => {
  const response = await api.get(
    `/vets/${id}/performance`
  );

  return response.data;
};