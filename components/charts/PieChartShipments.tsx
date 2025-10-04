"use client";

import {Cell, Legend, Pie, PieChart, PieLabelRenderProps, ResponsiveContainer, Tooltip} from 'recharts';
import {Card} from "@/components/ui/card";

type Props = {
  data:
    {
      total?: number;
      in_transit?: number;
      delivered?: number;
      delayed?: number;
      pending?: number;
      totalIncome?: number;
      totalSpent?: number;
    },
  title: string
};

const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];


const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent}: PieLabelRenderProps) => {
  if (!percent || percent === 0) return null;
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) return null;
  const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.4;
  const x = Number(cx) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = Number(cy) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > Number(cx) ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartShipments({data, title}: Props) {

  const chartData = [
    {name: "Total", value: Number(data?.total) || 0},
    {name: "In Transit", value: Number(data?.in_transit) || 0},
    {name: "Delivered", value: Number(data?.delivered) || 0},
    {name: "Delayed", value: Number(data?.delayed) || 0},
    {name: "Pending", value: Number(data?.pending) || 0},
    {name: "Total Income", value: Number(data?.totalIncome) || 0},
    {name: "Total Spent", value: Number(data?.totalSpent) || 0}
  ];
  const summary = chartData.filter(d => d.value !== 0);

  return (
    <Card className="p-4 h-[300px] w-[300px]">
      <h3 className="font-semibold mb-2 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            data={summary}
            cx="50%"
            cy="50%"
            outerRadius={80}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            <Tooltip/>
            <Legend/>
            {summary.map((entry, index) => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]}/>
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Card>

  )
    ;
}