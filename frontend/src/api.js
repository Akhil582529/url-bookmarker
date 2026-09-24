/**
 * Managed by the orchestrator. Agents must NOT rewrite this file — import
 * from it. Every request goes through here so auth token handling and
 * error shape stay consistent across pages.
 */

const TOKEN_KEY = 'auth_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function request(pathname, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();

  if (token) headers.Authorization = 'Bearer ' + token;

  const res = await fetch(pathname, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await res.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
  }

  if (!res.ok) {
    throw new Error((data && data.error) || 'Request failed: ' + res.status);
  }

  return data;
}

export const get = (p) => request(p);
export const post = (p, body) => request(p, { method: 'POST', body });
export const put = (p, body) => request(p, { method: 'PUT', body });
export const del = (p) => request(p, { method: 'DELETE' });
