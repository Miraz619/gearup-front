export async function apiFetch<T>(
  path: string,
  options: RequestInit & {
    revalidate?: number;
  } = {}
): Promise<T> {
  const backendUrl = process.env.BACKEND_API_URL;

  if (!backendUrl) {
    throw new Error("BACKEND_API_URL is not configured");
  }

  const { revalidate, ...fetchOptions } = options;

  const response = await fetch(`${backendUrl}${path}`, {
    ...fetchOptions,
    ...(revalidate
      ? { next: { revalidate } }
      : { cache: "no-store" }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "API request failed"
    );
  }

  return result;
}