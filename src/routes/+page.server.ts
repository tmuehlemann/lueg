import { db } from '$lib/server/db/db';
import {movie, user as users} from '$lib/server/db/schema';
import type {Actions, PageServerLoad} from './$types';
import {fail, redirect} from "@sveltejs/kit";
import {authenticated, logout} from "$lib/server/user";

export const load = (async ({locals}) => {
    const {user} = await authenticated(locals)

    return {
        user,
        users: await db.select().from(users),
        movies: await db.select().from(movie)
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    logout: async ({locals}) => {
        if (!await logout(locals)) return fail(401)
        throw redirect(302, "/login")
    }
}