"use client";

import {Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';
import {Card} from "@/components/ui/card";

const data01 = [
  {name: 'Group A', value: 400},
  {name: 'Group B', value: 300},
  {name: 'Group C', value: 300},
  {name: 'Group D', value: 200},
  {name: 'Group E', value: 278},
  {name: 'Group F', value: 189},
];

type Props = {
  total?: number;
  in_transit?: number;
  delivered?: number;
  delayed?: number;
  pending?: number;
  totalIncome?: number;
  totalSpent?: number;
};

export default function PieChartShipments({data}: { data: Props }) {

  const summary = [
    {name: "Total", value: data?.total || 0},
    {name: "In Transit", value: data?.in_transit || 0},
    {name: "Delivered", value: data?.delivered || 0},
    {name: "Delayed", value: data?.delayed || 0},
    {name: "Pending", value: data?.pending || 0},
    {name: "Total Income", value: data?.totalIncome || 0},
    {name: "Total Spent", value: data?.totalSpent || 0}
  ]
  return (
    <Card className="p-4 h-[300px] w-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={summary}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
    </Card>

  );
}