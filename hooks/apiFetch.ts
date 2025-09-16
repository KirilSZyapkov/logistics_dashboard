export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      ...options
    });
    console.log("apiFetch 11",res);
    
    if (res.ok) {
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