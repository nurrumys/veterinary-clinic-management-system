import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type AppointmentsByVetChartProps = {
  data: {
    vetName: string;
    count: number;
  }[];
};

function AppointmentsByVetChart({
  data,
}: AppointmentsByVetChartProps) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          dataKey="vetName"
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />

        <Tooltip />

        <Bar
          dataKey="count"
          radius={[8, 8, 0, 0]}
          fill="#2563EB"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AppointmentsByVetChart;