export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
  errorMessage = "An error occurred while fetching data"
): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      ...options
    });
    if (!res.ok) throw new Error(errorMessage);

    const data = await res.json();

    return data;
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
}