import React, { ReactElement } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/card';

type Props = {
  data: {
    date: string;
    Delivered: number;
    Delayed: number;
  }[];
  title: string;
};

interface TickProps {
  x: number;
  y: number;
  payload: { value: string; offset: number };
  width: number;
  visibleTicksCount: number;
}

const monthTickFormatter = (tick: string) => {
  const date = new Date(tick);
  const val = date.getMonth() + 1;

  return val.toLocaleString();
};

const renderQuarterTick = (tickProps: TickProps): React.ReactElement<SVGAElement> => {
  const { x, y, payload, width, visibleTicksCount } = tickProps;
  const { value, offset } = payload;
  const date = new Date(value);
  const month = date.getMonth();
  const quarterNo = Math.floor(month / 3) + 1;
  // const isMidMonth = month % 3 === 1;

  if (month % 3 === 1) {
    return <text x={x + width / visibleTicksCount / 2 - offset} y={y - 4} textAnchor="middle">{`Q${quarterNo}`}</text>;
  }

  const isLast = month === 11;

  if (month % 3 === 0 || isLast) {
    const pathX = Math.floor(isLast ? x - offset + width / visibleTicksCount : x - offset) + 0.5;

    return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />;
  }
  return <g />;
};

export default function BarChartShipments({ data, title }: Props) {
  return (
    <Card className='w-full p-4 rounded-xl shadow-lg bg-white'>
      <h2 className='text-lg font-semibold mb-4'>{title}</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={monthTickFormatter} />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={renderQuarterTick}
            height={1}
            scale="band"
            xAxisId="quarter"
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Delivered" fill="#246640" />
          <Bar dataKey="Delayed" fill="#872123" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
