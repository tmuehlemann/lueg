import {db} from "$lib/server/db/db";
import {fileUpload, movie, movieToGenre} from "$lib/server/db/schema";
import {and, eq, isNull} from "drizzle-orm";
import {getMovie} from "$lib/server/metadata/tmdb";
import type {TmdbMovie} from "$lib/server/metadata/tmdb.schema";
import {undefined} from "zod";
import {writeFile} from "fs/promises";
import {makeSafeFilename} from "$lib/helper/filename";


export async function publishMovie(
    fileUploadId: number,
    tmdbId: number,
) {

    // get file upload
    const movieFileUpload : fileUpload | null = db.query.fileUpload.findFirst({
        where: (fileUpload, {and, eq}) => and(
            eq(fileUpload.id, fileUploadId),
            isNull(fileUpload.movieId)
        )
    })

    if (!fileUpload) {
        throw new Error("File upload not found, because the id is wrong or it is already published")
    }

    // get movie metadata
    let metadata : TmdbMovie
    try {
        metadata = await getMovie(tmdbId)
    } catch (e) {
        console.error(e)
        throw new Error("Failed to get movie metadata")
    }

    // download poster and backdrop
    try {
        const TMDB_BASE = 'https://image.tmdb.org/t/p/original'
        let filename = makeSafeFilename(metadata.title)
        await downloadFile(TMDB_BASE + metadata.poster_path, 'static/metadata/posters/' + filename + '.jpg')
        await downloadFile(TMDB_BASE + metadata.backdrop_path, 'static/metadata/backdrops/' + filename + '.jpg')
        metadata.poster_path = filename + '.jpg'
        metadata.backdrop_path = filename + '.jpg'
    } catch (e) {
        console.error(e)
        throw new Error("Failed to download poster or backdrop")
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
            backdropPath: metadata.backdrop_path,
            budget: metadata.budget
        })

        await t1.update(fileUpload).set({
            movieId: movieTable[0].insertId
        }).where(eq(fileUpload.id, file.id))

        await t1.insert(movieToGenre).values(metadata.genres.map((genre) => {
            return {
                movieId: movieTable[0].insertId,
                genreId: genre.id
            }
        }))
    })

    return true
}

async function downloadFile(url : string, destination : string) {
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    await writeFile(destination, Buffer.from(buffer))

}