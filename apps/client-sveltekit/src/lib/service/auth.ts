import { writable } from "svelte/store";
import { apiFetch } from "$lib/service/service";
import { z } from "zod";
import { goto } from "$app/navigation";
import { compactVerify, decodeJwt, jwtDecrypt, jwtVerify } from "jose";

const respSchema = z.object({
  access_token: z.string(),
});

type AuthStore = { access_token: string | null; isAuthenticated: boolean };

// Initialize the store with an initial value
const initialState: AuthStore = {
  access_token: null,
  isAuthenticated: false,
};

function setupAuthStore() {
  const { subscribe, set, update } = writable<AuthStore>(initialState);

  if (!import.meta.env.SSR) {
    init();
  }

  async function init() {
    // todo: read token from local storage
    const token = localStorage.getItem("access-token");
    if (token) {
      // check if token is valid
      try {
        await setAccessToken(token);
      } catch (e) {
        console.error(e);
        set(initialState);
        localStorage.removeItem("access-token");
      }

      set({ access_token: token, isAuthenticated: true });
    }
  }

  async function setAccessToken(accessToken: string) {
    const jwtPayload = await decodeJwt(accessToken);

    if (jwtPayload.exp === undefined || jwtPayload.exp < Date.now() / 1000) {
      throw new Error("Token expired");
    }

    localStorage.setItem("access-token", accessToken);

    // todo: read access token and make it more accessible
    auth.set({
      access_token: accessToken,
      isAuthenticated: true,
    });
  }

  async function login(username: string, password: string) {
    const resp = await apiFetch("/auth/login", {
      method: "POST",
      body: {
        username,
        password,
      },
    });

    try {
      const tokenDto = respSchema.parse(resp);

      await setAccessToken(tokenDto.access_token);

      return true;
    } catch (e) {
      console.error(e);
    }
    return false;
  }

  async function logout() {
    auth.set(initialState);
    localStorage.removeItem("access-token");
    await goto("/login");
  }

  return {
    subscribe,
    set,
    update,
    login,
    logout,
  };
}

// Create the writable store with initial state
export const auth = setupAuthStore();
