export interface PetWeightRecord {
  id: number;
  petId: number;
  weightKg: number;
  recordedAt: string;
  note: string | null;
}

export interface CreatePetWeightRecordRequest {
  weightKg: number;
  recordedAt: string;
  note?: string;
}