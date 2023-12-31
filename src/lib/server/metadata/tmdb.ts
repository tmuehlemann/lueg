import {TMDB_API_KEY} from '$env/static/private'
import type {TmdbGenre, TmdbMovie} from "$lib/server/metadata/tmdb.schema";
import {genreListSchema, movieSchema} from "$lib/server/metadata/tmdb.schema";

const baseUrl = "https://api.themoviedb.org/3"

export async function getMovie(id) : Promise<TmdbMovie> {
    const response = await apiFetch(`/movie/${id}`)

    return movieSchema.parse(response)
}

export function queryMovie(query : string, year? : number) {
    return apiFetch(`/search/movie?query=${query}${year ? `&year=${year}` : ''}`)
}

export async function getMovieGenres() : Promise<TmdbGenre[]> {
    const response = await apiFetch(`/genre/movie/list`)

    return (genreListSchema.parse(response)).genres
}

function apiFetch(path : string, settings : RequestInit = {}) {

    const completeSettings : RequestInit = {
        ...settings,
        headers: {
            ...settings?.headers,
            "Authorization": `Bearer ${TMDB_API_KEY}`,
            "Accept": "application/json",
        }
    }

    const url = baseUrl + path

    console.log('fetching from the movie db', url)

    return fetch(url, completeSettings)
        .then(res => res.ok ? res.json() : Promise.reject(res))
}