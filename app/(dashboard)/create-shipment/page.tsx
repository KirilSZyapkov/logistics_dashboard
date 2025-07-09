"use client";

import { useUser } from "@clerk/nextjs";
import { shipmentSchema, Shipment } from "@/lib/validation";
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
import { useState } from "react";
import { createShipment } from "@/lib/shipments/shipments";

export default function CreateShipmentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof shipmentSchema>>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      clientName: "",
      orderNumber: "",
      tourNumber: "",
      transportCompany: "",
      truckNumber: "",
      price: "",
      loadingFrom: "",
      deliveryTo: "",
      loadingDate: "",
      deliveryDate: "",
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



  async function onSubmit(values: z.infer<typeof shipmentSchema>) {
    setIsLoading(true);
    try {
      
      if(values.clientName === "" || values.orderNumber === "" || values.tourNumber === "" || values.transportCompany === "" || values.truckNumber === "" || values.price === "" || values.loadingFrom === "" || values.deliveryTo === "" || values.loadingDate === "" || values.deliveryDate === "") {
        throw new Error("Please fill in all fields.");
      }
      const response = await createShipment(values);
      alert("Shipment created successfully!");
      form.reset();
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error creating shipment:", error);
      alert(error.message);
      setIsLoading(false);
      return;

    }

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-2 w-full">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Shipment</h1>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Client Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orderNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Order Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tourNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Tour Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transportCompany"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transport Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Transport Company" {...field} />
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
                  <FormLabel>Truck Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Truck Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loadingFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loading From</FormLabel>
                  <FormControl>
                    <Input placeholder="Loading From" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery To</FormLabel>
                  <FormControl>
                    <Input placeholder="Delivery To" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="loadingDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Loading Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Delivery Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              variant="default"
              className="w-full cursor-pointer"
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