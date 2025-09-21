"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
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
import { getClientCurrentUser } from "@/lib/auth/client";
import { User } from "@/lib/validation";
import { createUser } from "@/lib/users/user";
import Loader from "@/components/shared/Loader";


type SyncData = {
  name: string;
};

export default function SyncUser() {

  const loadedUser = getClientCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const form = useForm<SyncData>({
    defaultValues: {
      name: "",
    },
  });

  const handleSync = async (values: SyncData) => {

    const newUser: User = {
      name: values.name.trim(),
      email: user!.emailAddresses[0].emailAddress, // TODO: fetch from auth provider
      clerkId: user!.id, // TODO: fetch from auth provider
      organization: "USB", //  
      role: "staff"
    };

    try {
      setIsLoading(true);
      const newCreatedUser = await createUser(newUser);
      if (newCreatedUser) form.reset();
      setIsLoading(false);
    } catch (error) {
      alert("Failed to create user");
      console.error("Error creating user:", error);
    }
  };

  if (loadedUser){
    return null;
  } else {
    return <Loader/>
  };

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