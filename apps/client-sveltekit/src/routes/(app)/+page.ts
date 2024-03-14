import type { PageLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { apiFetch } from "$lib/service/service";

export const load = (async () => {
  let user, movies;

  try {
    user = await apiFetch("/auth/profile", { authenticated: true });
    // movies = await apiFetch("/movies");
  } catch {
    console.log("failed to fetch");
    redirect(302, "/login");
  }

  return {
    user,
    movies: [],
    // movies,
  };
}) satisfies PageLoad;
