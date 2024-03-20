import { getMovie } from "$lib/service/api";
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load = (async ({ params }) => {
  let movie;

  try {
    movie = await getMovie(params.id);
  } catch {
    error(404, "Movie not found");
  }

  return {
    movie,
  };
}) satisfies PageLoad;
