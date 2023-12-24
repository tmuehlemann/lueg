import { db } from '$lib/server/db/db';
import { users } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        users: await db.select().from(users)
    };
}) satisfies PageServerLoad;
