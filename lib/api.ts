export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1"
).replace(/\/$/, "");

interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  token?: string | null;
}

interface ApiErrorBody {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

export class ApiError extends Error {
  status: number;
  details?: ApiErrorBody;

  constructor(message: string, status: number, details?: ApiErrorBody) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function normalizeMessage(body: ApiErrorBody | null, fallback: string) {
  if (!body?.message) return body?.error ?? fallback;
  return Array.isArray(body.message) ? body.message.join(" ") : body.message;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { body, token, headers, ...init } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new ApiError(
      normalizeMessage(data, "Une erreur est survenue."),
      response.status,
      data,
    );
  }

  return data as T;
}

export function getApiErrorMessage(error: unknown) {
  if (error instanceof ApiError) return error.message;
  if (error instanceof TypeError) return "Impossible de contacter le serveur. Vérifiez votre connexion.";
  if (error instanceof Error) return error.message;
  return "Une erreur inattendue est survenue.";
}
