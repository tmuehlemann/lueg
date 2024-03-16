import { auth } from "$lib/service/auth";
import { get } from "svelte/store";

export const BASE_URL = "http://localhost:3000";

export type ApiFetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: string | object;
  headers?: Record<string, string>;
  authenticated?: boolean;
  emptyResponse?: boolean;
};

export async function apiFetch(path: string, options?: ApiFetchOptions) {
  console.log("API FETCH:", path);

  let fetchOptions: ApiFetchOptions & {
    body?: string;
    headers: Record<string, string>;
  } = {
    headers: { ...options?.headers },
  };

  if (options) {
    if ("method" in options) {
      fetchOptions.method = options.method;
    }

    if (typeof options?.body === "object") {
      fetchOptions.body = JSON.stringify(options.body);
      fetchOptions.headers["Content-Type"] = "application/json";
    }

    if (options?.authenticated === true) {
      const authState = get(auth);
      if (authState.isAuthenticated) {
        fetchOptions.headers["Authorization"] =
          "Bearer " + authState.access_token;
      }
    }
  }
  const resp = await fetch(BASE_URL + path, fetchOptions);

  if (!resp.ok) {
    throw new Error();
  }

  // only return json if there is content

  try {
    return await resp.json();
  } catch (e) {
    if (options?.emptyResponse) {
      return;
    }

    throw e;
  }
}
