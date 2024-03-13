import type { Actions } from "./$types";
import { authenticated } from "$lib/server/user";
import { indexMovies } from "$lib/server/filesystem/indexMovies";

export const actions: Actions = {
  indexMovies: async ({ request, locals }) => {
    await authenticated(locals);

    await indexMovies();
  },
} satisfies Actions;
