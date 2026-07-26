export type VisitStatus =
  | "SCHEDULED"
  | "CHECKED_IN"
  | "IN_EXAM"
  | "COMPLETED"
  | "CANCELLED";

export interface Visit {
  id: number;
  petId: number;
  vetId: number;
  scheduledAt: string;
  status: VisitStatus;
  chiefComplaint: string;
  diagnosis: string | null;
  treatmentNotes: string | null;
  followUpDate: string | null;
  warnings: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateVisitRequest {
  petId: number;
  vetId: number;
  scheduledAt: string;
  chiefComplaint: string;
}

export interface UpdateVisitRequest {
  petId: number;
  vetId: number;
  scheduledAt: string;
  chiefComplaint: string;
}

export interface UpdateVisitStatusRequest {
  status: VisitStatus;
}

export interface UpdateMedicalNotesRequest {
  diagnosis: string;
  treatmentNotes: string;
  followUpDate: string | null;
}

export interface VisitFilters {
  page?: number;
  size?: number;
  sort?: string;
  vetId?: number;
  from?: string;
  to?: string;
  status?: VisitStatus;
}