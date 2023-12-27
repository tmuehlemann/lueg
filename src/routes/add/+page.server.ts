import {authenticated} from "$lib/server/user";
import {db} from "$lib/server/db/db";
import {user as users} from "$lib/server/db/schema";
import type {Actions, PageServerLoad} from "./$types";
import {queryMovie} from "$lib/server/metadata/tmdb";

export const load = (async ({locals}) => {
    const {user} = await authenticated(locals)

    return {
        user,
        users: await db.select().from(users)
    };
}) satisfies PageServerLoad;


export const actions : Actions = {
    hello: async ({request, locals}) => {
        const query = (await request.formData()).get("query")

        const data = await queryMovie(query)

        return {
            success: true,
            data
        }
    }
} satisfies Actions;