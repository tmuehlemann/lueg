import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { getMovies } from "$lib/service/api";

export const load = (async () => {
  let movies;

  try {
    movies = await getMovies();
  } catch {
    console.log("failed to fetch");
    redirect(302, "/login");
  }

  return {
    movies,
  };
}) satisfies PageLoad;
