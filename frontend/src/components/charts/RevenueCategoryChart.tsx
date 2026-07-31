import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

type RevenueCategoryChartProps = {
  data: {
    category: string;
    amount: number;
  }[];
};

const COLORS = [
  "#2563EB",
  "#16A34A",
  "#F59E0B",
  "#DC2626",
  "#7C3AED",
  "#0891B2",
];

const CATEGORY_LABELS: Record<string, string> = {
  CONSULTATION: "Consultation",
  VACCINATION: "Vaccination",
  SURGERY: "Surgery",
  HOSPITAL: "Hospital Services",
  OTHER: "Other",
};

function RevenueCategoryChart({
  data,
}: RevenueCategoryChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    label:
      CATEGORY_LABELS[item.category] ??
      item.category,
  }));

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <PieChart>
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="label"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={3}
        >
          {chartData.map((_, index) => (
            <Cell
              key={index}
              fill={
                COLORS[index % COLORS.length]
              }
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend
          verticalAlign="bottom"
          height={36}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default RevenueCategoryChart;