
import {readdir} from "fs/promises";
import {LIBRARY_PATH} from "$env/static/private";
import {glob} from "glob";
import {removeStartsWith} from "$lib/helper/string";
import {db} from "$lib/server/db/db";
import {createFileUpload} from "$lib/server/filesystem/fileupload";
import {getUserByUsername} from "$lib/server/user";
import {extractMovieInfo, extractMovieName} from "$lib/helper/filename";
import * as path from "path";
import {queryMovie} from "$lib/server/metadata/tmdb";
import {publishMovie} from "$lib/server/movie/publish";

export async function indexMovies() {

    // read all files in library folder
    let files = await glob(LIBRARY_PATH + "/**/*.{mkv,mp4}")

    // remove library path from file path
    files = files.map(file => removeStartsWith(file, LIBRARY_PATH))

    // check if file is already in db
    const uploaded = await db.query.fileUpload.findMany({
        where: (fileUpload, {inArray}) => inArray(fileUpload.path, files)
    })

    // add files that are not in db
    const adminUser = await getUserByUsername('admin')
    const toUpload = files.filter(file => !uploaded.some(u => u.path === file))
    for (const file of toUpload) {
        await createFileUpload(file, adminUser)
    }

    // find metadata for fileUploads
    const unpublished = await db.query.fileUpload.findMany({
        where: (fileUpload, {isNull}) => isNull(fileUpload.movieId),
    })

    for (const movie of unpublished) {
        try {
            const metadata = await findMovieMetadata(movie.path)
            await publishMovie(movie.id, metadata.id)
        } catch (e) {
            console.log('no metadata found for', movie.path)
        }
    }
}

async function findMovieMetadata(moviePath) {
    const {names, years} = extractMovieInfo(path.basename(moviePath))


    console.log('searching for', names, years)

    for (const name of names) {

        if (years.length == 0) {
            const resp = await queryMovie(name)
            if (resp.results.length > 0) {
                return resp.results[0]
            }
        }

        for (const year of years) {

            const resp = await queryMovie(name, year)

            if (resp.results.length > 0) {

                return resp.results[0]
            }
        }
    }

    throw new Error('no metadata found')
}