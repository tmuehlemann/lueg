import { apiFetch } from "./service";

// Movies
// TODO: define type
type Movie = Record<string, unknown>;

export async function getMovie(id: string): Movie {
  const movie = await apiFetch(`/movies/${id}`, { authenticated: true });
  movie.releaseDate = new Date(movie.releaseDate);
  return movie;
}

export const getMovies = async () =>
  await apiFetch("/movies", { authenticated: true });

export async function patchMovie(id: string, data: Partial<Movie>) {
  return await apiFetch(`/movies/${id}`, {
    method: "PATCH",
    body: data,
    authenticated: true,
  });
}

export async function getMovieImages(movieId: string) {
  return await apiFetch(`/movies/${movieId}/images`, {
    authenticated: true,
  });
}

export async function syncMovies() {
  await apiFetch("/movies/sync", {
    method: "POST",
    authenticated: true,
    emptyResponse: true,
  });
}

// mediaFiles
export async function getMediaFile(id: string) {
  return await apiFetch(`/media-files/${id}`, { authenticated: true });
}
