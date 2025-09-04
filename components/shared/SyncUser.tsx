"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function SyncUser() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    redirect('/sign-in');
  };

  const handleSync = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement sync logic here (e.g., API call)
    alert("User synced!");
  };

  return (
    <form onSubmit={handleSync}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        defaultValue={user?.emailAddresses[0]?.emailAddress || ""}
        required
        readOnly
      />
      <button type="submit">Sync User</button>
    </form>
  )
}