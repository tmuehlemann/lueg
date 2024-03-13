import {db} from "$lib/server/db/db";
import {fileUpload} from "$lib/server/db/schema";
import {writeFile} from "fs/promises";
import type {User} from "lucia";
import {LIBRARY_PATH} from '$env/static/private'

export async function createFileUpload(path, uploader) {
    console.log('creating file upload', path, uploader.username)
    return await db.insert(fileUpload).values({ path, uploaderId: uploader.userId });
}

export async function writeFileUpload(path : string, file : File, uploader : User) {
    await writeFile(LIBRARY_PATH + path, Buffer.from(await file.arrayBuffer()))
    return await createFileUpload(path, uploader)
}