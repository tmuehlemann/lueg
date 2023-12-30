import {db} from "$lib/server/db/db";
import {fileUpload, movie} from "$lib/server/db/schema";
import {and, eq, isNull} from "drizzle-orm";
import {getMovie} from "$lib/server/metadata/tmdb";
import type {TmdbMovie} from "$lib/server/metadata/tmdb.schema";
import {undefined} from "zod";


export async function publishMovie(
    fileUploadId: number,
    tmdbId: number,
) {

    // get file upload

    const response= await db.select().from(fileUpload).where(
        and(
            eq(fileUpload.id, fileUploadId),
    ))

    if (response.length !== 1) {
        throw new Error("File upload not found")
    }

    const movieFileUpload = response[0]

    if (movieFileUpload.movieId !== null) {
        throw new Error("File upload already published")
    }

    // get movie metadata
    let metadata : TmdbMovie
    try {
        metadata = await getMovie(tmdbId)
    } catch (e) {
        console.error(e)
        throw new Error("Failed to get movie metadata")
    }

    // create movie entry
    return await createMovie(movieFileUpload, metadata)
}

async function createMovie(file , metadata : TmdbMovie) {
    console.log('creating movie entry')

    await db.transaction(async (t1) => {

        const movieTable = await t1.insert(movie).values({
            originalLanguage: metadata.original_language,
            originalTitle: metadata.original_title,
            overview: metadata.overview,
            releaseDate: metadata.release_date,
            status: metadata.status,
            title: metadata.title,
            tmdbId: metadata.id,
            imdbId: metadata.imdb_id,
            posterPath: metadata.poster_path,
            revenue: metadata.revenue,
            runtime: metadata.runtime,
            tagline: metadata.tagline,
        })

        await t1.update(fileUpload).set({
            movieId: movieTable[0].insertId
        }).where(eq(fileUpload.id, file.id))
    })

    return true
}