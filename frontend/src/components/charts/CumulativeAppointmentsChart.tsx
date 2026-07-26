import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type CumulativeAppointmentsChartProps = {
  data: {
    date: string;
    cumulativeCount: number;
  }[];
};

function CumulativeAppointmentsChart({
  data,
}: CumulativeAppointmentsChartProps) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <AreaChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="cumulativeCount"
          stroke="#2563EB"
          fill="#BFDBFE"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default CumulativeAppointmentsChart;