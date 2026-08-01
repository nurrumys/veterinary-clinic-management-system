import api from "./api";

import type {
  Vaccination,
  VaccinationStats,
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





/* ---------------- Vaccinations ---------------- */


export const getVaccinations = async (
  params?: GetVaccinationsParams
): Promise<VaccinationPageResponse> => {

  const response =
    await api.get<VaccinationPageResponse>(
      "/vaccinations",
      {
        params,
      }
    );

  return response.data;
};




export const getVaccinationById = async (
  id: number
): Promise<Vaccination> => {

  const response =
    await api.get<Vaccination>(
      `/vaccinations/${id}`
    );

  return response.data;
};




export const createVaccination = async (
  data: CreateVaccinationRequest
): Promise<Vaccination> => {

  const response =
    await api.post<Vaccination>(
      "/vaccinations",
      data
    );

  return response.data;
};




export const updateVaccination = async (
  id: number,
  data: UpdateVaccinationRequest
): Promise<Vaccination> => {

  const response =
    await api.put<Vaccination>(
      `/vaccinations/${id}`,
      data
    );

  return response.data;
};




export const deleteVaccination = async (
  id: number
): Promise<void> => {

  await api.delete(
    `/vaccinations/${id}`
  );
};





/* ---------------- Vaccination Stats ---------------- */


export const getVaccinationStats = async (
): Promise<VaccinationStats> => {

  const response =
    await api.get<VaccinationStats>(
      "/vaccinations/stats"
    );

  return response.data;
};