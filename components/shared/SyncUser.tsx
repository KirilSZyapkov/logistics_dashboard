"use client";

import { useUser } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";
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
import { User } from "@/lib/validation";
import { createUser } from "@/lib/users/user";
import { userTables } from "@/drizzle/schemas/users";

type SyncData = {
  name: string;
};

export default function SyncUser() {
 
  // const loadedUser = getCurrentUser();
  const [loadedUser, setLoadedUser] = useState<null | typeof userTables.$inferSelect>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, user } = useUser();
  
  useEffect(() => {
      async function fetch() {
        if (!isSignedIn || !user) return null;
        const response = await apiFetch<typeof userTables.$inferSelect>(`/api/user?userId=${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          cache: "no-store"
        });
        if(response){
          setLoadedUser(response);
        } else {
          setLoadedUser(null);
        }
      };
      fetch();
    }, [isSignedIn, user?.id]);

  const form = useForm<SyncData>({
    defaultValues: {
      name: "",
    },
  });

  console.log("syncUser 61", user);
  console.log("syncUser 61", loadedUser);

  const handleSync = async (values: SyncData) => {

    const newUser: User = {
      name: values.name.trim(),
      email: user!.emailAddresses[0].emailAddress, // TODO: fetch from auth provider
      clerkId: user!.id, // TODO: fetch from auth provider
      organization: "USB", //  
      role: "staff"
    };

    console.log("syncUser 51", newUser);


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
  console.log(loadedUser);

  if (loadedUser) return null;

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