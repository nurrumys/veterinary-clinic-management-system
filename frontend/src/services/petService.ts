import api from "./api";

import type {
  Pet,
  CreatePetRequest,
  UpdatePetRequest,
} from "../types/pet";


export type PetPageResponse = {
  content: Pet[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};



export const getPets = async (
  archived = false
) => {

  const response = await api.get<PetPageResponse>(
    `/pets?active=${!archived}`
  );

  return response.data;

};



export const getPetById = async (
  id: number
) => {

  const response = await api.get<Pet>(
    `/pets/${id}`
  );

  return response.data;

};



export const createPet = async (
  data: CreatePetRequest
) => {

  const response = await api.post<Pet>(
    "/pets",
    data
  );

  return response.data;

};



export const updatePet = async (
  id: number,
  data: UpdatePetRequest
) => {

  const response = await api.put<Pet>(
    `/pets/${id}`,
    data
  );

  return response.data;

};



export const archivePet = async (
  id:number
) => {

  const response = await api.patch<Pet>(
    `/pets/${id}/archive`
  );

  return response.data;

};



export const activatePet = async (
  id:number
) => {

  const response = await api.patch<Pet>(
    `/pets/${id}/activate`
  );

  return response.data;

};