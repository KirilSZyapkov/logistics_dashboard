import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ShipmentsCardProps = {
  total: number;
  in_transit: number;
  delivered: number;
  delayed: number;
  pending: number;
  totalIncome: number;
};

export default function ShipmentsCard({ shipmentsData }: { shipmentsData: ShipmentsCardProps }) {
  return (
    <section className="w-full">
      <div className="sticky top-0 z-10 bg-white pb-1">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Shipments</h2>
      </div>
      <div className="flex flex-row gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
        <Card className="min-w-[160px] rounded-lg border border-gray-200 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 hover:scale-[1.03] transition-transform p-3">
          <CardHeader className="flex flex-row items-center gap-1 p-0">
            <span className="text-blue-500 text-lg">📦</span>
            <CardTitle className="text-base font-medium text-blue-700">Total</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-xl font-bold text-blue-900">{shipmentsData.total}</p>
          </CardContent>
        </Card>
        <Card className="min-w-[160px] rounded-lg border border-gray-200 shadow-sm bg-gradient-to-br from-yellow-50 to-yellow-100 hover:scale-[1.03] transition-transform p-3">
          <CardHeader className="flex flex-row items-center gap-1 p-0">
            <span className="text-yellow-500 text-lg">🚚</span>
            <CardTitle className="text-base font-medium text-yellow-700">Transit</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-xl font-bold text-yellow-900">{shipmentsData.in_transit}</p>
          </CardContent>
        </Card>
        <Card className="min-w-[160px] rounded-lg border border-gray-200 shadow-sm bg-gradient-to-br from-green-50 to-green-100 hover:scale-[1.03] transition-transform p-3">
          <CardHeader className="flex flex-row items-center gap-1 p-0">
            <span className="text-green-500 text-lg">✅</span>
            <CardTitle className="text-base font-medium text-green-700">Delivered</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-xl font-bold text-green-900">{shipmentsData.delivered}</p>
          </CardContent>
        </Card>
        <Card className="min-w-[160px] rounded-lg border border-gray-200 shadow-sm bg-gradient-to-br from-red-50 to-red-100 hover:scale-[1.03] transition-transform p-3">
          <CardHeader className="flex flex-row items-center gap-1 p-0">
            <span className="text-red-500 text-lg">⏰</span>
            <CardTitle className="text-base font-medium text-red-700">Delayed</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-xl font-bold text-red-900">{shipmentsData.delayed}</p>
          </CardContent>
        </Card>
        <Card className="min-w-[160px] rounded-lg border border-gray-200 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 hover:scale-[1.03] transition-transform p-3">
          <CardHeader className="flex flex-row items-center gap-1 p-0">
            <span className="text-purple-500 text-lg">🕒</span>
            <CardTitle className="text-base font-medium text-purple-700">Pending</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-xl font-bold text-purple-900">{shipmentsData.pending}</p>
          </CardContent>
        </Card>
        <Card className="min-w-[160px] rounded-lg border border-gray-200 shadow-sm bg-gradient-to-br from-teal-50 to-teal-100 hover:scale-[1.03] transition-transform p-3">
          <CardHeader className="flex flex-row items-center gap-1 p-0">
            <span className="text-teal-500 text-lg">💰</span>
            <CardTitle className="text-base font-medium text-teal-700">Income</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-xl font-bold text-teal-900">{shipmentsData.totalIncome}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}