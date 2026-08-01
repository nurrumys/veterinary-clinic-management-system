import api from "./api";

import type {
  Veterinarian,
  VeterinarianPerformance,
  VeterinarianStatsResponse,
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


/* ---------------- Veterinarians ---------------- */


export const getVets = async (
  params?: GetVetsParams
): Promise<VetPageResponse> => {

  const response =
    await api.get<VetPageResponse>(
      "/vets",
      {
        params,
      }
    );

  return response.data;
};



export const getVetById = async (
  id: number
): Promise<Veterinarian> => {

  const response =
    await api.get<Veterinarian>(
      `/vets/${id}`
    );

  return response.data;
};



export const createVet = async (
  data: CreateVeterinarianRequest
): Promise<Veterinarian> => {

  const response =
    await api.post<Veterinarian>(
      "/vets",
      data
    );

  return response.data;
};



export const updateVet = async (
  id: number,
  data: UpdateVeterinarianRequest
): Promise<Veterinarian> => {

  const response =
    await api.put<Veterinarian>(
      `/vets/${id}`,
      data
    );

  return response.data;
};



/* ---------------- Veterinarian Stats ---------------- */


export const getVetStats = async (
): Promise<VeterinarianStatsResponse> => {

  const response =
    await api.get<VeterinarianStatsResponse>(
      "/vets/stats"
    );

  return response.data;
};



/* ---------------- Performance ---------------- */


export const getVetPerformance = async (
  id: number
): Promise<VeterinarianPerformance> => {

  const response =
    await api.get<VeterinarianPerformance>(
      `/vets/${id}/performance`
    );

  return response.data;
};