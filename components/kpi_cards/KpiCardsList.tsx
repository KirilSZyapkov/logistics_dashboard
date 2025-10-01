import { getShipmentsData, getTransportsData } from "@/lib/kpi_cards/kpiCards";
import ShipmentsCard from "./_components/ShipmentsCard";
// import TransportsCard from "./_components/TransportsCard";

export default async function KpiCardsList() {

  const resShipments = await getShipmentsData();
  const resTransports = await getTransportsData();

  const shipmentsData = await resShipments.json();
  const transportsData = await resTransports.json();

  console.log("KpiCardsList 8", shipmentsData);
  console.log("KpiCardsList 9", transportsData);

  return (
    <div className="flex items-center justify-center h-screen w-full flex-col">

      <ShipmentsCard shipmentsData={shipmentsData} />
      {/* <TransportsCard transportsData={transportsData} /> */}
    </div>
  );
}