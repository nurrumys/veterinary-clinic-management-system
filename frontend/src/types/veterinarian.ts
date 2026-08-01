export type Veterinarian = {
  id: number;

  name: string;

  specialty: string;

  licenseNo: string;

  workHours: string;

  active: boolean;

  createdAt: string;

  updatedAt: string;
};


export type CreateVeterinarianRequest = {
  name: string;

  specialty: string;

  licenseNo: string;

  workHours: string;
};


export type UpdateVeterinarianRequest =
  CreateVeterinarianRequest;


export type VeterinarianPerformance = {
  vetId: number;

  vetName: string;

  totalVisitsYtd: number;

  completedVisitsYtd: number;

  cancelledVisitsYtd: number;

  upcomingVisits: number;

  revenueGeneratedYtd: number;
};


// API /vets/stats response
export type VeterinarianStatsResponse = {
  totalVets: number;

  availableDoctors: number;

  specialties: number;

  newThisMonth: number;
};