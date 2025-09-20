import { userTables } from "@/drizzle/schemas/users";
import { apiFetch } from "@/hooks/apiFetch";
import { User } from "@/lib/validation";

export async function getCurrentUser(userId: string): Promise<typeof userTables.$inferSelect> {
  console.log("lib/user 6", userId );
  
  const response = await apiFetch<typeof userTables.$inferSelect>(`${process.env.NEXT_PUBLIC_URL}/api/user?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      cache: "no-store"
    });

    console.log("lib/user 16", response );
    
  if (!response) throw new Error("Failed to fetch current user");

  return response;
};

export async function createUser(data: User): Promise<typeof userTables.$inferSelect> {
  
  const response = await apiFetch<typeof userTables.$inferSelect>("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    credentials: "include",
    cache: "no-store"
  });

  if (!response) throw new Error("Failed to create user");

  return response;
}

