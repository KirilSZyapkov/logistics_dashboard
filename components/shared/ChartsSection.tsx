"use client";

import { useState, useEffect } from "react";

import PieChartShipments from "../charts/PieChartShipments";

type ShipmentsDataList = {
  total: number;
  in_transit: number;
  delivered: number;
  delayed: number;
  pending: number;
  totalIncome: number;
};

type TransportsDataList = {
  total: number;
  in_transit: number;
  delivered: number;
  delayed: number;
  totalSpent: number;
};

export default function ChartsSection() {
  const [shipmentsDataList, setShipmentsDataList] = useState<ShipmentsDataList>();
  const [transportsDataList, setTransportsDataList] = useState<TransportsDataList>();

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch('/api/summary/shipments_data', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
          credentials: 'include',
        });
        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();        
        setShipmentsDataList(data);
      } catch (error) {
        console.error("Error fetching shipments data:", error);
      }

    };
    load();
  }, []);

  console.log("chartsection 53",shipmentsDataList);
  

  return (
    <section className="w-full">
      <PieChartShipments />
    </section>
  );
}