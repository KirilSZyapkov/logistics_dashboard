"use client";

import { useUser } from "@clerk/nextjs";
import { transportsSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createTransport } from "@/lib/transports/transports";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateShipment } from "@/lib/shipments/shipments";


type FreeOrders = {
  id: string;
}[];

export default function CreateTransportPage() {
  const [freeOrders, setFreeOrders] = useState<FreeOrders>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchFreeOrders() {
      try {
        const response = await fetch("/api/shipments/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch free shipments");
        };
        const data = await response.json();
        setFreeOrders(data);

      } catch (error) {
        console.log(error);
        setFreeOrders([]);
      }
    };
    fetchFreeOrders();
  }, []);

  const form = useForm<z.infer<typeof transportsSchema>>({
    resolver: zodResolver(transportsSchema),
    defaultValues: {
      transportCompanyName: "",
      truckNumber: "",
      deliveryDay: "",
      loadingDay: "",
    },
  });

  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600">You must be signed in to view this page.</p>
      </div>
    );
  };



  async function onSubmit(values: z.infer<typeof transportsSchema>) {
    if(!user){
      throw new Error("User must be logged in to create a transport");
    };
    
    setIsLoading(true);
    const newTransport = {
      ...values,
      shipmentId: selectedOrder,
      createdBy: user.id
    };
    try {

      if (values.transportCompanyName === "" || values.truckNumber === "" || values.deliveryDay === "" || values.loadingDay === "" || selectedOrder === "") {
        throw new Error("Please fill in all fields.");
      };
      const response = await createTransport(newTransport);
      if(response.status === 500){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create transport");
      };
      
      const transport = await response.json();
      await updateShipment(selectedOrder, transport );

      alert("Shipment created successfully!");
      form.reset();
      setSelectedOrder("");
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error creating shipment:", error);
      alert(error.message);
      setIsLoading(false);
      return;

    };

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-2 w-full">
      <div className="w-full sm:max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-10 transition-all duration-300">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Create Transport</h1>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="transportCompanyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-700">Transport Company</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Transport Company"
                      {...field}
                      className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="truckNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-700">Truck Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Truck Number"
                      {...field}
                      className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full rounded-lg">{selectedOrder || "Free Shipments"}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup onValueChange={(value) => setSelectedOrder(value)}>
                  {freeOrders.length !== 0 && (freeOrders.map(order => (<DropdownMenuRadioItem key={order.id} value={order.id}>{order.id}</DropdownMenuRadioItem>)))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="loadingDay"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-lg font-semibold text-gray-700">Loading Day</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryDay"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-lg font-semibold text-gray-700">Delivery Day</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              variant="default"
              className="w-full py-3 rounded-lg text-lg font-bold transition-all cursor-pointer"
              disabled={isLoading}
            >
              {isLoading
                ? "Creating..."
                : "Create Shipment"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}