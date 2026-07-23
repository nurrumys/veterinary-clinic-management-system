export type RevenueCategory =
  | "CONSULTATION"
  | "MEDICATION"
  | "VACCINATION"
  | "SURGERY"
  | "LAB_TEST"
  | "OTHER";

export type VisitStatus =
  | "SCHEDULED"
  | "COMPLETED"
  | "CANCELLED";

export interface MonthlyRevenueEntry {
  month: string;
  revenue: number;
}

export interface RevenueCategoryEntry {
  category: RevenueCategory;
  amount: number;
}

export interface AppointmentTrendEntry {
  date: string;
  count: number;
}

export interface CumulativeAppointmentEntry {
  date: string;
  cumulativeCount: number;
}

export interface VetAppointmentCountEntry {
  vetId: number;
  vetName: string;
  count: number;
}

export interface TodayScheduleEntry {
  visitId: number;
  petName: string;
  vetName: string;
  scheduledAt: string;
  status: VisitStatus;
}

export interface VaccinationAlertEntry {
  petId: number;
  petName: string;
  vaccineType: string;
  nextDueDate: string;
}

export interface FollowUpAlertEntry {
  visitId: number;
  petName: string;
  followUpDate: string;
}

export interface DashboardSummary {
  todayAppointments: number;
  activePatients: number;
  pendingVaccinations: number;
  unpaidInvoices: number;

  monthlyRevenue: MonthlyRevenueEntry[];

  revenueByCategory: RevenueCategoryEntry[];

  appointmentTrend30Days: AppointmentTrendEntry[];

  cumulativeAppointmentsYtd: CumulativeAppointmentEntry[];

  appointmentsByVet: VetAppointmentCountEntry[];

  todaySchedule: TodayScheduleEntry[];

  upcomingVaccinationAlerts: VaccinationAlertEntry[];

  overdueFollowUpAlerts: FollowUpAlertEntry[];
}