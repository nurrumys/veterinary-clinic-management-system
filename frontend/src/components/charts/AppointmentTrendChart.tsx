import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type AppointmentTrendData = {
  date: string;
  count: number;
};

type AppointmentTrendChartProps = {
  data: AppointmentTrendData[];
};

function AppointmentTrendChart({
  data,
}: AppointmentTrendChartProps) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 15,
          left: -10,
          bottom: 10,
        }}
      >
        <CartesianGrid
          stroke="#e2e8f0"
          strokeDasharray="4 4"
        />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "#64748b",
            fontSize: 12,
          }}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "#64748b",
            fontSize: 12,
          }}
        />

        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
          }}
          cursor={{
            stroke: "#06b6d4",
            strokeWidth: 1,
          }}
        />

        <Line
          type="monotone"
          dataKey="count"
          stroke="#06b6d4"
          strokeWidth={3}
          dot={{
            r: 5,
            fill: "#ffffff",
            stroke: "#06b6d4",
            strokeWidth: 3,
          }}
          activeDot={{
            r: 7,
            strokeWidth: 3,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default AppointmentTrendChart;