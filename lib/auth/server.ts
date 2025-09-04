import { auth } from "@clerk/nextjs/server";
import { getCurrentUser } from "../users/user";
import { userTables } from "@/drizzle/schemas/users";

export async function getUser(): Promise<typeof userTables.$inferSelect> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const currUser = await getCurrentUser(userId);

  return currUser;
};
