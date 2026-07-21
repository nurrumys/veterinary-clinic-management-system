import api from "./api";

import type {
  Vaccination,
  CreateVaccinationRequest,
  UpdateVaccinationRequest,
} from "../types/vaccination";

export type VaccinationPageResponse = {
  content: Vaccination[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type GetVaccinationsParams = {
  page?: number;
  size?: number;
  sort?: string;
};

export const getVaccinations = async (
  params?: GetVaccinationsParams
) => {
  const response = await api.get<VaccinationPageResponse>(
    "/vaccinations",
    {
      params,
    }
  );

  return response.data;
};

export const getVaccinationById = async (
  id: number
) => {
  const response = await api.get<Vaccination>(
    `/vaccinations/${id}`
  );

  return response.data;
};

export const createVaccination = async (
  data: CreateVaccinationRequest
) => {
  const response = await api.post<Vaccination>(
    "/vaccinations",
    data
  );

  return response.data;
};

export const updateVaccination = async (
  id: number,
  data: UpdateVaccinationRequest
) => {
  const response = await api.put<Vaccination>(
    `/vaccinations/${id}`,
    data
  );

  return response.data;
};

export const deleteVaccination = async (
  id: number
) => {
  await api.delete(
    `/vaccinations/${id}`
  );
};