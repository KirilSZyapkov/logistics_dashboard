
export async function getCurrentUser(userId: string) {
  const response = await fetch(`/api/users?userId=${userId}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    cache: "no-store"
  });
  if(!response.ok) throw new Error("Failed to fetch current user");

  const user = await response.json();

  return user;
};

