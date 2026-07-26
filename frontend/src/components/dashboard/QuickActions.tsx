import { useNavigate } from "react-router-dom";

import {
  CalendarPlus,
  PawPrint,
  Users,
  FileText,
} from "lucide-react";

import Card from "../ui/Card";

const actions = [
  {
    title: "New Appointment",
    path: "/appointments",
    icon: CalendarPlus,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Add Pet",
    path: "/pets",
    icon: PawPrint,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Add Owner",
    path: "/owners",
    icon: Users,
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
  {
    title: "New Invoice",
    path: "/invoices",
    icon: FileText,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card className="h-full">
      {/* Header */}

      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Frequently used actions
        </p>
      </div>

      {/* Actions */}

      <div className="mt-6 grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="
                flex
                h-32
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-200
                bg-white
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-cyan-400
                hover:shadow-md
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-400
              "
            >
              <div
                className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${action.bg}`}
              >
                <Icon
                  size={24}
                  className={action.color}
                />
              </div>

              <span className="text-[15px] font-medium text-slate-700">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

export default QuickActions;