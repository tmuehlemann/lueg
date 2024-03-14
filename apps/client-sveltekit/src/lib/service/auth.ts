import { writable } from "svelte/store";
import { apiFetch } from "$lib/service/service";
import { z } from "zod";
import { goto } from "$app/navigation";

const respSchema = z.object({
  access_token: z.string(),
});

export async function login(username: string, password: string) {
  const resp = await apiFetch("/auth/login", {
    method: "POST",
    body: {
      username,
      password,
    },
  });

  try {
    const tokenDto = respSchema.parse(resp);

    // todo: read access token and make it more accessible
    auth.set({
      access_token: tokenDto.access_token,
      isAuthenticated: true,
    });
    return true;
  } catch (e) {
    console.error(e);
  }
  return false;
}

export async function logout() {
  auth.set(initialState);
  await goto("/login");
}

type AuthStore = { access_token: string | null; isAuthenticated: boolean };

// Initialize the store with an initial value
const initialState: AuthStore = {
  access_token: null,
  isAuthenticated: false,
};

// Create the writable store with initial state
export const auth = writable<AuthStore>(initialState);
