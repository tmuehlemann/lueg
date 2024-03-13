import {authenticated} from "$lib/server/user";
import type {PageServerLoad} from './$types';
import {error} from "@sveltejs/kit";
import {db} from "$lib/server/db/db";
import {z} from "zod";

export const load = (async ({params, locals}) => {
    await authenticated(locals)

    // get parsed id from path params
    let id: number
    try {
        const parsedParams = z.object({
            id: z.coerce.number().positive().int(),
        }).parse(params)

        id = parsedParams.id
    } catch (e) {
        console.error('trying to access movie route with malformed id in path', e)
        throw error(404, 'Movie not found')
    }

    // get movie from db
    const foundMovie = await db.query.movie.findFirst({
        where: (movie, {eq}) => eq(movie.id, id),
        with: {
            movieToGenre: {
                with: {
                    genre: true
                }
            },
            fileUploads: true
        }
    })

    if (!foundMovie) {
        throw error(404, 'Movie not found')
    }

    // make genre props more accessible and remove join table
    foundMovie.genres = foundMovie.movieToGenre.map(mtg => mtg.genre)
    delete foundMovie.movieToGenre

    return {
        movie: foundMovie
    }
}) satisfies PageServerLoad;