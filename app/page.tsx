import KpiCardsList from "@/components/kpi_cards/KpiCardsList";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen w-full flex-col">
      <h1 className="text-2xl font-bold">Welcome to the Logistics Dashboard</h1>
      <KpiCardsList />
    </div>
  );
}