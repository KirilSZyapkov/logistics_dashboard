import { auth } from "@clerk/nextjs/server";

async function getUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const currUser = await getCurrentUser(userId);

  return currUser;
}