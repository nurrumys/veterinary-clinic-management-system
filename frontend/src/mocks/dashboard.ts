export type AppointmentTrendData = {
  day: string;
  appointments: number;
};

export const dashboardStats = {
  activePatients: 142,
  veterinarians: 18,
  todayAppointments: 48,
  unpaidInvoices: "$12,500",
};

export const appointmentTrendData: AppointmentTrendData[] = [
  {
    day: "Mon",
    appointments: 12,
  },
  {
    day: "Tue",
    appointments: 28,
  },
  {
    day: "Wed",
    appointments: 18,
  },
  {
    day: "Thu",
    appointments: 10,
  },
  {
    day: "Fri",
    appointments: 15,
  },
  {
    day: "Sat",
    appointments: 24,
  },
  {
    day: "Sun",
    appointments: 32,
  },
];

export const todayAppointments = [
  {
    id: 1,
    time: "09:00",
    pet: "Max",
    owner: "Ahmet Yılmaz",
    service: "General Checkup",
    veterinarian: "Dr. Mehmet Kaya",
    status: "Confirmed",
  },
  {
    id: 2,
    time: "10:30",
    pet: "Luna",
    owner: "Ayşe Demir",
    service: "Vaccination",
    veterinarian: "Dr. Ayşe Yılmaz",
    status: "Pending",
  },
  {
    id: 3,
    time: "11:30",
    pet: "Bella",
    owner: "Mehmet Kaya",
    service: "Dental Care",
    veterinarian: "Dr. Selin Aksoy",
    status: "In Progress",
  },
  {
    id: 4,
    time: "14:00",
    pet: "Buddy",
    owner: "Zeynep Şahin",
    service: "Surgery Consultation",
    veterinarian: "Dr. Mehmet Kaya",
    status: "Scheduled",
  },
];
export const recentActivities = [
  {
    id: 1,
    title: "New Owner",
    description: "A new owner was added.",
    time: "10:15 AM",
  },
  {
    id: 2,
    title: "Vaccination",
    description: "Buddy's vaccination completed.",
    time: "09:30 AM",
  },
  {
    id: 3,
    title: "Invoice Paid",
    description: "Payment received successfully.",
    time: "Yesterday",
  },
];

