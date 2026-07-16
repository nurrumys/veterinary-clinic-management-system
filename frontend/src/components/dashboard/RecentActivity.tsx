import {
  UserPlus,
  Syringe,
  Receipt,
} from "lucide-react";

import Card from "../ui/Card";
import { recentActivities } from "../../mocks/dashboard";

function getIcon(title: string) {
  if (title.toLowerCase().includes("owner")) {
    return (
      <UserPlus
        size={20}
        className="text-violet-600"
      />
    );
  }

  if (title.toLowerCase().includes("vaccination")) {
    return (
      <Syringe
        size={20}
        className="text-green-600"
      />
    );
  }

  return (
    <Receipt
      size={20}
      className="text-orange-600"
    />
  );
}

function RecentActivity() {
  return (
    <Card className="h-full w-full max-w-[360px] ml-auto">
      <div className="flex h-full flex-col">

        {/* Header */}

        <div className="mb-6">

          <h2 className="text-xl font-semibold text-slate-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recent activities in the clinic
          </p>

        </div>

        {/* Activities */}

        <div className="flex flex-1 flex-col gap-2">

          {recentActivities.slice(0, 3).map((activity) => (

            <div
              key={activity.id}
              className="flex items-start gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-slate-50"
            >

              {/* Icon */}

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                {getIcon(activity.title)}
              </div>

              {/* Content */}

              <div className="min-w-0 flex-1">

                <h4 className="truncate text-sm font-semibold text-slate-800">
                  {activity.title}
                </h4>

                <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
                  {activity.description}
                </p>

              </div>

              {/* Time */}

              <span className="shrink-0 text-xs font-medium text-slate-400 whitespace-nowrap">
                {activity.time}
              </span>

            </div>

          ))}

        </div>

      </div>
    </Card>
  );
}

export default RecentActivity;