import { userTables } from "@/drizzle/schemas/users";
import { apiFetch } from "@/hooks/apiFetch";

export async function getCurrentUser(userId: string): Promise<typeof userTables.$inferSelect> {
  const response = await apiFetch<typeof userTables.$inferSelect>(`/api/user?userId=${userId}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    cache: "no-store"
  });
  if(!response) throw new Error("Failed to fetch current user");

 return response;
};

