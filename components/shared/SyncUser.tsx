"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
import { userSchema } from "@/lib/validation";
import { apiFetch } from "@/hooks/apiFetch";
import { getCurrentUser } from "@/lib/auth/client";

type SyncData = {
  name: string;
};

type SyncUserProps = {
  open: boolean;
  onClose: () => void;
};

export default function SyncUser() {
  
  const  loadedUser  = getCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SyncData>({
    defaultValues: {
      name: "",
    },
  });
   console.log(loadedUser);
   

  // if (!isSignedIn) return null;

  const handleSync = async (values: SyncData) => {
    // TODO: Implement sync logic here (e.g., API call)
    alert(values.name);
  };

  if (!loadedUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Shipment</h1>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSync)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="default"
              className="w-full cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Enter Name"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}