import {authenticated} from "$lib/server/user";
import {db} from "$lib/server/db/db";
import {user as users} from "$lib/server/db/schema";
import type {PageServerLoad, Actions} from "./$types";
import {indexMovies} from "$lib/server/filesystem/indexMovies";

export const load = (async ({locals}) => {
    const {user} = await authenticated(locals)

    return {
        user,
        users: await db.select().from(users)
    };
}) satisfies PageServerLoad;

export const actions : Actions = {
    indexMovies: async ({request, locals}) => {
        await authenticated(locals)

        await indexMovies()
    },
} satisfies Actions;