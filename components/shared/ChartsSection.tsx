"use client";

import {useState, useEffect} from "react";

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
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const shipmentsSummary = await response.json();
        setShipmentsDataList(shipmentsSummary);
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
        setTransportsDataList(transportsSummary)
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
    delivered:inDeliverd,
    in_transit: inTransit,
    delayed: inDelayed
  };

  const transportsData = {
    delivered:inDeliverdTransport,
    in_transit: inTransitTransport,
    delayed: inDelayedTransport
  };
  return (
    <section className="w-full flex items-center justify-evenly">
      <PieChartShipments data={shipmentsData}/>
      <PieChartShipments data={transportsData}/>
    </section>
  );
}