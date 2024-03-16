import type { PageLoad } from "./$types";
import { error, fail, redirect } from "@sveltejs/kit";
import { apiFetch } from "$lib/service/service";

export const load = (async ({ params }) => {
  let movie;

  try {
    movie = await apiFetch(`/movies/${params.id}`, { authenticated: true });
  } catch {
    error(404, "Movie not found");
  }

  movie.releaseDate = new Date(movie.releaseDate);

  return {
    movie,
  };
}) satisfies PageLoad;
