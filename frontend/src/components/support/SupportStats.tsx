import Card from "../ui/Card";

import type { SupportRequest } from "../../types/support";

type SupportStatsProps = {
  supports: SupportRequest[];
};

function SupportStats({
  supports,
}: SupportStatsProps) {
  const total = supports.length;

  const open = supports.filter(
    (item) => item.status === "OPEN"
  ).length;

  const inProgress = supports.filter(
    (item) => item.status === "IN_PROGRESS"
  ).length;

  const resolved = supports.filter(
    (item) => item.status === "RESOLVED"
  ).length;

  const stats: {
    title: string;
    value: number;
  }[] = [
    {
      title: "Total Requests",
      value: total,
    },
    {
      title: "Open",
      value: open,
    },
    {
      title: "In Progress",
      value: inProgress,
    },
    {
      title: "Resolved",
      value: resolved,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <div className="space-y-1">
            <p className="text-sm text-slate-500">
              {stat.title}
            </p>

            <h2 className="text-3xl font-bold tabular-nums text-slate-900">
              {stat.value}
            </h2>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default SupportStats;