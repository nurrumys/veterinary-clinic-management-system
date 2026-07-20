import {
  Edit,
  FileText,
  RefreshCw,
} from "lucide-react";

import type { Visit } from "../../types/visit";

type AppointmentRowProps = {
  appointment: Visit;
  petName: string;
  vetName: string;
  onEdit: (appointment: Visit) => void;
  onUpdateStatus: (appointment: Visit) => void;
  onMedicalNotes: (appointment: Visit) => void;
};

const statusStyles = {
  SCHEDULED: "bg-blue-100 text-blue-700",
  CHECKED_IN: "bg-yellow-100 text-yellow-700",
  IN_EXAM: "bg-purple-100 text-purple-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDateTime(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function AppointmentRow({
  appointment,
  petName,
  vetName,
  onEdit,
  onUpdateStatus,
  onMedicalNotes,
}: AppointmentRowProps) {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50">
      <td className="px-4 py-4 font-medium text-slate-900">
        #{appointment.id}
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        {petName}
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        {vetName}
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        {formatDateTime(appointment.scheduledAt)}
      </td>

      <td className="px-4 py-4">
        <span
          className={`
            inline-flex
            whitespace-nowrap
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${statusStyles[appointment.status]}
          `}
        >
          {formatStatus(appointment.status)}
        </span>
      </td>

      <td className="px-4 py-4">
        {appointment.chiefComplaint}
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => onEdit(appointment)}
            className="text-indigo-600 transition-colors hover:text-indigo-800"
            title="Edit Appointment"
          >
            <Edit size={18} />
          </button>

          <button
            onClick={() => onUpdateStatus(appointment)}
            className="text-amber-600 transition-colors hover:text-amber-800"
            title="Update Status"
          >
            <RefreshCw size={18} />
          </button>

          <button
            onClick={() => onMedicalNotes(appointment)}
            className="text-emerald-600 transition-colors hover:text-emerald-800"
            title="Medical Notes"
          >
            <FileText size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default AppointmentRow;