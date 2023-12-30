import {test} from "vitest";
import {indexMovies} from "$lib/server/filesystem/indexMovies";

test("basic index movies", async () => {
    await indexMovies()
});