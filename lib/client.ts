"use client";

import { useUser } from "@clerk/nextjs";
import { apiFetch } from "@/hooks/apiFetch";
import { userTables } from "@/drizzle/schemas/users";

export function getCurrentUser() {
  const {user, isLoaded, isSignedIn} = useUser();
  if(!isLoaded || !isSignedIn || !user) return null;

  const response = apiFetch<typeof userTables.$inferSelect>(`/api/user?userId=${user.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    cache: "no-store"
  });
  if(!response) throw new Error("Failed to fetch current user");
  
  return {response, isLoaded, isSignedIn};
}