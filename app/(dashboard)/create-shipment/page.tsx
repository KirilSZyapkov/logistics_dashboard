import { currentUser } from "@clerk/nextjs/server";


export default async function CreateShipmentPage() {

  const user = await currentUser();
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600">You must be signed in to view this page.</p>
      </div>
    );
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Create Shipment Page</h1>
      <p className="text-gray-600">This is the create shipment page content.</p>
    </div>
  );
}