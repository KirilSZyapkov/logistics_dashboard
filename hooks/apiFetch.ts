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
    if (!res.ok) {
      const data = await res.json();
      return data;
    } else {
      return null;
    }


  } catch (error: unknown) {
    console.log(error);
    return null;
  }
}