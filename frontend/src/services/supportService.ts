import api from "./api";

import type {
  SupportRequest,
  CreateSupportRequest,
  UpdateSupportRequestStatus,
  SupportRequestStatus,
} from "../types/support";

export type SupportPageResponse = {
  content: SupportRequest[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type GetSupportRequestsParams = {
  page?: number;
  size?: number;
  status?: SupportRequestStatus;
};

export const getSupportRequests = async (
  params?: GetSupportRequestsParams
) => {
  const response = await api.get<SupportPageResponse>(
    "/support-requests",
    {
      params,
    }
  );

  return response.data;
};

export const getSupportRequestById = async (
  id: number
) => {
  const response = await api.get<SupportRequest>(
    `/support-requests/${id}`
  );

  return response.data;
};

export const createSupportRequest = async (
  data: CreateSupportRequest
) => {
  const response = await api.post<SupportRequest>(
    "/support-requests",
    data
  );

  return response.data;
};

export const updateSupportRequestStatus = async (
  id: number,
  data: UpdateSupportRequestStatus
) => {
  const response = await api.patch<SupportRequest>(
    `/support-requests/${id}/status`,
    data
  );

  return response.data;
};