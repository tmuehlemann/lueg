import {db} from "$lib/server/db/db";
import {fileUpload, genre, key, movie, movieToGenre, session, user} from "$lib/server/db/schema";
import {exit} from "process";
import {auth} from "$lib/server/lucia"
import {createUser} from "$lib/server/user";
import type {TmdbGenre} from "$lib/server/metadata/tmdb.schema";
import {getMovieGenres} from "$lib/server/metadata/tmdb";


const args = process.argv.slice(2)

if (args.includes('--clean') || process.env.npm_config_clean) {
    console.log('cleaning')
    await db.delete(session)
    await db.delete(key)
    await db.delete(user)
    await db.delete(fileUpload)
    await db.delete(movieToGenre)
    await db.delete(movie)
    await db.delete(genre)
}

console.log('seeding:')

console.log('- users')
const user = await createUser("admin", "password")
const user2 = await createUser("john", "password")
const user3 = await createUser("jane", "password")

console.log('- genres')
try {
    const genres : TmdbGenre[] = await getMovieGenres()

    await db.insert(genre).values( genres.map((tmdbGenre : TmdbGenre) => ({
        id: tmdbGenre.id,
        name: tmdbGenre.name,
    })))

} catch (e) {
    console.error('failed to get genres from TMDB', e)
}

console.log('done')
exit(0)