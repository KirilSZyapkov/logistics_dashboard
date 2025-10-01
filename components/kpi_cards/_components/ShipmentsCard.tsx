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
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      <Card className="rounded-xl shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-blue-700">Total Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-extrabold text-blue-900">{shipmentsData.total}</p>
        </CardContent>
      </Card>
      <Card className="rounded-xl shadow-md bg-gradient-to-br from-yellow-50 to-yellow-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-yellow-700">Total In Transit</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-extrabold text-yellow-900">{shipmentsData.in_transit}</p>
        </CardContent>
      </Card>
      <Card className="rounded-xl shadow-md bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-green-700">Total Delivered</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-extrabold text-green-900">{shipmentsData.delivered}</p>
        </CardContent>
      </Card>
      <Card className="rounded-xl shadow-md bg-gradient-to-br from-red-50 to-red-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-red-700">Total Delayed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-extrabold text-red-900">{shipmentsData.delayed}</p>
        </CardContent>
      </Card>
      <Card className="rounded-xl shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-purple-700">Total Pending</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-extrabold text-purple-900">{shipmentsData.pending}</p>
        </CardContent>
      </Card>
      <Card className="rounded-xl shadow-md bg-gradient-to-br from-teal-50 to-teal-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-teal-700">Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-extrabold text-teal-900">{shipmentsData.totalIncome}</p>
        </CardContent>
      </Card>
    </section>
  );
}