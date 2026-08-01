import api from "./api";

import type {
  Pet,
  CreatePetRequest,
  UpdatePetRequest,
  PetStatsResponse,
} from "../types/pet";

import type {
  PetWeightRecord,
  CreatePetWeightRecordRequest,
} from "../types/petWeightRecord";

import type { Visit } from "../types/visit";
import type { Vaccination } from "../types/vaccination";

export interface PetPageResponse {
  content: Pet[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface GetPetsParams {
  page?: number;
  size?: number;
  search?: string;
  species?: string;
  ownerId?: number;
  active?: boolean;
  sort?: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

/* ---------------- Pets ---------------- */

export const getPets = async (
  params?: GetPetsParams
): Promise<PetPageResponse> => {
  const response =
    await api.get<PetPageResponse>(
      "/pets",
      {
        params,
      }
    );

  return response.data;
};

export const getPetById = async (
  id: number
): Promise<Pet> => {
  const response =
    await api.get<Pet>(
      `/pets/${id}`
    );

  return response.data;
};

export const createPet = async (
  data: CreatePetRequest
): Promise<Pet> => {
  const response =
    await api.post<Pet>(
      "/pets",
      data
    );

  return response.data;
};

export const updatePet = async (
  id: number,
  data: UpdatePetRequest
): Promise<Pet> => {
  const response =
    await api.put<Pet>(
      `/pets/${id}`,
      data
    );

  return response.data;
};

export const archivePet = async (
  id: number
): Promise<Pet> => {
  const response =
    await api.patch<Pet>(
      `/pets/${id}/archive`
    );

  return response.data;
};

export const activatePet = async (
  id: number
): Promise<Pet> => {
  const response =
    await api.patch<Pet>(
      `/pets/${id}/activate`
    );

  return response.data;
};

/* ---------------- Weight Records ---------------- */

export const getPetWeightRecords = async (
  petId: number
): Promise<PetWeightRecord[]> => {
  const response =
    await api.get<PetWeightRecord[]>(
      `/pets/${petId}/weight-records`
    );

  return response.data;
};

export const addPetWeightRecord = async (
  petId: number,
  data: CreatePetWeightRecordRequest
): Promise<PetWeightRecord> => {
  const response =
    await api.post<PetWeightRecord>(
      `/pets/${petId}/weight-records`,
      data
    );

  return response.data;
};

/* ---------------- Visit History ---------------- */

export const getPetVisits = async (
  petId: number,
  page = 0,
  size = 10
): Promise<PageResponse<Visit>> => {
  const response =
    await api.get<PageResponse<Visit>>(
      `/pets/${petId}/visits`,
      {
        params: {
          page,
          size,
        },
      }
    );

  return response.data;
};

/* ---------------- Vaccination History ---------------- */

export const getPetVaccinations = async (
  petId: number,
  page = 0,
  size = 10
): Promise<PageResponse<Vaccination>> => {
  const response =
    await api.get<PageResponse<Vaccination>>(
      `/pets/${petId}/vaccinations`,
      {
        params: {
          page,
          size,
        },
      }
    );

  return response.data;
};

/* ---------------- Pet Statistics ---------------- */

export const getPetStats = async (): Promise<PetStatsResponse> => {
  const response =
    await api.get<PetStatsResponse>(
      "/pets/stats"
    );

  return response.data;
};