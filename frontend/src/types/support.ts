export type SupportRequestStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "RESOLVED";

export interface SupportRequest {
  id: number;
  requestedByUserId: number;
  requestedByName: string;
  subject: string;
  message: string;
  status: SupportRequestStatus;
  adminResponse: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupportRequest {
  subject: string;
  message: string;
}

export interface UpdateSupportRequestStatus {
  status: SupportRequestStatus;
  adminResponse?: string;
}