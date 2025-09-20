"use client";

import { useUser } from "@clerk/nextjs";
import { apiFetch } from "@/hooks/apiFetch";
import { userTables } from "@/drizzle/schemas/users";
import { useEffect, useState } from "react";

export function getClientCurrentUser() {
  const [loadedUser, setLoadedUser] = useState<null | typeof userTables.$inferSelect>(null);
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
  }, [isSignedIn, user]);

  return loadedUser;
}