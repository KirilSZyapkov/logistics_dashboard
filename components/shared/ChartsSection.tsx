"use client";

import { useState, useEffect } from "react";

import PieChartShipments from "../charts/PieChartShipments";
import BarChartShipments from "../charts/BarChartShipments";
import LineCharts from "../charts/LineCharts";
import { getAllShipments } from "@/lib/shipments/shipments";
import { mapingDateToYYYYMM, mapingIncome, mapingSpent } from "@/lib/utils";
import { getAllTransports } from "@/lib/transports/transports";

export type ShipmentsDataList = {
  total: number;
  in_transit: number;
  delivered: number;
  delayed: number;
  pending: number;
  totalIncome: number;
};

export type TransportsDataList = {
  total: number;
  in_transit: number;
  delivered: number;
  delayed: number;
  totalSpent: number;
};

type ShipmentsData = {
  date: string;
  Delivered: number;
  Delayed: number;
};

type TransportsData = {
  date: string;
  Delivered: number;
  Delayed: number;
};

type ShipmentsIncome = {
  month: string;
  Income: number;
};

type TransportsSpent = {
  month: string;
  Spent: number;
};

export default function ChartsSection() {
  const [shipmentsDataList, setShipmentsDataList] = useState<ShipmentsDataList>();
  const [transportsDataList, setTransportsDataList] = useState<TransportsDataList>();
  const [shipments, setShipments] = useState<ShipmentsData[]>([]);
  const [transports, setTransports] = useState<TransportsData[]>([]);
  const [shipmentsIncome, setShipmentsIncome] = useState<ShipmentsIncome[]>([]);
  const [transportsSpent, setTransportsSpent] = useState<TransportsSpent[]>([]);

  useEffect(() => {
    async function load() {
      try {
        // Fetch shipments summary
        const response = await fetch('/api/summary/shipments_data', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const shipmentsSummary = await response.json();
        setShipmentsDataList(shipmentsSummary);

        // Fetch transports summary
        const response_two = await fetch("/api/summary/transports_data", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          cache: 'no-store',
          credentials: 'include'
        });
        if (!response_two.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        ;

        const transportsSummary = await response_two.json();
        setTransportsDataList(transportsSummary);

        // Fetch shipments for BarChart
        const responseShipments = await getAllShipments();
        if (responseShipments.status === 200) {
          const data = await responseShipments.json();
          const dataArray = mapingDateToYYYYMM(data);
          const incomeArray = mapingIncome(data);
          setShipments(dataArray);
          setShipmentsIncome(incomeArray);
        };

        // Fetch transports for BarChart
        const responseTransports = await getAllTransports();
        if (responseTransports.status === 200) {
          const data = await responseTransports.json();
          const dataArray = mapingDateToYYYYMM(data);
          const spentArray = mapingSpent(data);
          setTransports(dataArray);
          setTransportsSpent(spentArray);
        };

      } catch (error) {
        console.error("Error fetching shipments data:", error);
      }

    };
    load();
  }, []);

  const inTransit = (Number(shipmentsDataList?.in_transit) / Number(shipmentsDataList?.total)) * 100;
  const inDelayed = (Number(shipmentsDataList?.delayed) / Number(shipmentsDataList?.total)) * 100;
  const inPending = (Number(shipmentsDataList?.pending) / Number(shipmentsDataList?.total)) * 100;
  const inDeliverd = (Number(shipmentsDataList?.delivered) / Number(shipmentsDataList?.total)) * 100;

  const inTransitTransport = (Number(transportsDataList?.in_transit) / Number(transportsDataList?.total)) * 100;
  const inDelayedTransport = (Number(transportsDataList?.delayed) / Number(transportsDataList?.total)) * 100;
  const inDeliverdTransport = (Number(transportsDataList?.delivered) / Number(transportsDataList?.total)) * 100;

  const shipmentsData = {
    pending: inPending,
    delivered: inDeliverd,
    in_transit: inTransit,
    delayed: inDelayed
  };

  const transportsData = {
    delivered: inDeliverdTransport,
    in_transit: inTransitTransport,
    delayed: inDelayedTransport
  };

  return (
    <section className="w-full flex flex-col items-center justify-center gap-6 py-4 px-2">
      <div className="flex flex-col md:flex-row items-center gap-6 w-full">
        <PieChartShipments data={shipmentsData} title={"Shipments Breakdown"} />
        <PieChartShipments data={transportsData} title={"Transport Breakdown"} />
      </div>
      <div className="w-full flex flex-col gap-5 justify-center">
        <BarChartShipments data={shipments} title={"Shipments Statistic"} />
        <BarChartShipments data={transports} title={"Transports Statistic"} />
      </div>
      <div className="w-full flex flex-col gap-5 justify-center">
        <LineCharts shipmetsIncome={shipmentsIncome} transportsSpent={transportsSpent} title={"Incomes and Spent Graphic"} />
      </div>
    </section>
  );
}