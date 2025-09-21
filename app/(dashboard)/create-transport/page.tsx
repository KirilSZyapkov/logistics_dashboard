"use client";

import { useUser } from "@clerk/nextjs";
import { transportsSchema, Transports } from "@/lib/validation";
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
import { createTransport } from "@/lib/transports/transports";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CreateTransportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof transportsSchema>>({
    resolver: zodResolver(transportsSchema),
    defaultValues: {
      transportCompanyName: "",
      truckNumber: "",
      deliveryDay: "",
      loadingDay: "",
      shipmentId: ""
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
    setIsLoading(true);
    try {

      if (values.transportCompanyName === "" || values.truckNumber === "" || values.deliveryDay === "" || values.loadingDay === "" || values.shipmentId === "") {
        throw new Error("Please fill in all fields.");
      };
      const response = await createTransport(values);
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
                <Button variant="outline" className="w-full rounded-lg">Free Shipments</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup>
                  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
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