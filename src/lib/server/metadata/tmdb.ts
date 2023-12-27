import { TMDB_API_KEY } from '$env/static/private'
const baseUrl = "https://api.themoviedb.org/3"

export function getMovie(id) {
    return apiFetch(`/movie/${id}`)
}

export function queryMovie(query) {
    return apiFetch(`/search/movie?query=${query}`)
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

    console.log(completeSettings)

    return fetch(baseUrl + path, completeSettings)
        .then(res => res.ok ? res.json() : Promise.reject(res))
}