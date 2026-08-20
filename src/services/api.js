const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const contentType = response.headers.get("content-type");
  const data = contentType?.includes("application/json") ? await response.json() : await response.text();
  if (!response.ok) throw new Error(typeof data === "object" ? data.message || "Erro na API" : data || "Erro na API");
  return data;
}
