import { getShipmentsData, getTransportsData } from "@/lib/summary/summary";
import ShipmentsCard from "./_components/ShipmentsCard";
import TransportsCard from "./_components/TransportsCard";

export default async function KpiCardsList() {

  const resShipments = await getShipmentsData();
  const resTransports = await getTransportsData();

  const shipmentsData = await resShipments.json();
  const transportsData = await resTransports.json();

  console.log("KpiCardsList 8", shipmentsData);
  console.log("KpiCardsList 9", transportsData);

  return (
    <div className="flex items-center w-full flex-col p-5 gap-10">
      <ShipmentsCard shipmentsData={shipmentsData} />

      <TransportsCard transportsData={transportsData} />
    </div>
  );
}