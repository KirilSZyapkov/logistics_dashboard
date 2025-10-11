"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/card';

type Props = {
  shipmetsIncome: {
    month: string;
    Income: number;
    Spent?: number;

  }[],
  transportsSpent: {
    month: string;
    Spent: number;
    Income?: number;

  }[],
  title: string;
};

export default function LineCharts({ shipmetsIncome, transportsSpent, title }: Props) {
  const arr = [...shipmetsIncome, ...transportsSpent];
  const n = new Map();
  arr.forEach(item => {
    if (!n.has(item.month)) {
      n.set(item.month, { Income: 0, Spent: 0 });
    };
    if(item.Income){
      n.get(item.month).Income += item.Income;
    } else if(item.Spent){
      n.get(item.month).Spent += item.Spent;
    }
  });

  const data = Array.from(n, ([month, { Income, Spent }]) => ({ month, Income, Spent }));

  console.log("lineCharts 35",data);
  

  return (
    <Card className='w-full p-4 rounded-xl shadow-lg bg-white h-96'>
      <h2 className='text-lg font-semibold mb-4'>{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Income" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Spent" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
