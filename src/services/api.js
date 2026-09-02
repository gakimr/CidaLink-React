export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.data || data?.message || `Erro ${response.status}`);
  return data;
}

export function salvarSessao(usuario, tipo) {
  sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  sessionStorage.setItem("tipoUsuario", tipo);
}

export function usuarioAtual() {
  try { return JSON.parse(sessionStorage.getItem("usuarioLogado")); }
  catch { return null; }
}
