import {expect, should, test} from "vitest";
import {extractMovieName} from "$lib/helper/filename";
import {publishMovie} from "$lib/server/movie/publish";
import {db} from "$lib/server/db/db";
import {fileUpload} from "$lib/server/db/schema";


const testMovieId = 1678

test("publishMovie function", async () => {
    const testUpload = await db.insert(fileUpload).values({ path: "static/library/Some.Movie.2021.1080p.BluRay.x264-Group.mkv", uploaderId: 1 });
    const uploadId = testUpload[0].insertId

    const movie = await publishMovie(uploadId,testMovieId)
    expect(movie).true
});

test("publish same Movie twice", async () => {

    const testUpload = await db.insert(fileUpload).values({ path: "static/library/Some.Movie.2021.1080p.BluRay.x264-Group.mkv", uploaderId: 1 });
    const uploadId = testUpload[0].insertId

    await publishMovie(uploadId,testMovieId)
    try {
        await publishMovie(uploadId, testMovieId)
        expect.unreachable()
    } catch (e) {
        expect(e.message).equals("File upload already published")
    }
});

test("publish with bad uploadId", async () => {
    const uploadId = 999999
    try {
        await publishMovie(uploadId, testMovieId)
        expect.unreachable()
    } catch (e) {
        expect(e.message).equals("File upload not found")
    }
});

test("publish with bad tmdb", async () => {

    const testUpload = await db.insert(fileUpload).values({ path: "static/library/Some.Movie.2021.1080p.BluRay.x264-Group.mkv", uploaderId: 1 });
    const uploadId = testUpload[0].insertId

    try {
        await publishMovie(uploadId, 0)
        expect.unreachable()
    } catch (e) {
        expect(e.message).equals("Failed to get movie metadata")
    }
});