import KpiCardsList from "@/components/kpi_cards/KpiCardsList";

export default function HomePage() {
  return (
    <div className="flex items-center w-full flex-col p-10">
      <h1 className="text-2xl font-bold">Welcome to the Logistics Dashboard</h1>
      <KpiCardsList />
    </div>
  );
}