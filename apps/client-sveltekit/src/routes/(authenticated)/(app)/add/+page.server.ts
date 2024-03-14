import {authenticated} from "$lib/server/user";
import {db} from "$lib/server/db/db";
import {fileUpload, user as users} from "$lib/server/db/schema";
import type {Actions, PageServerLoad} from "./$types";
import {queryMovie} from "$lib/server/metadata/tmdb";
import {fail, redirect} from "@sveltejs/kit";
import { writeFile } from 'fs/promises';
import {extractMovieName} from "$lib/helper/filename";
import {number, string, z, ZodError} from "zod";
import {publishMovie} from "$lib/server/movie/publish";
import {LIBRARY_PATH} from '$env/static/private'
import {createFileUpload, writeFileUpload} from "$lib/server/filesystem/fileupload";

export const load = (async ({locals}) => {
    const {user} = await authenticated(locals)

    return {
        user,
        users: await db.select().from(users)
    };
}) satisfies PageServerLoad;


export const actions : Actions = {
    upload: async ({request, locals}) => {

        const {user} = await authenticated(locals)

        // maybe switch to polka/express with multer or busboy
        // for improved handling of large file uploads

        const formData = Object.fromEntries((await request.formData()))

        const file: File = formData.file as File

        if (!file.name || !file.type || !file.size) {
            return fail(400, {
                error: true,
                message: "No file provided"
            })
        }

        const path = file.name;

        const fileUploadTable = await writeFileUpload(path, file, user)

        console.log(fileUploadTable)

        return {
            success: true,
            data: {
                movieName: extractMovieName(file.name),
                file : {
                    path: LIBRARY_PATH + path,
                    type: file.type,
                    size: file.size,
                    uploader: user.username,
                    id: fileUploadTable[0].insertId
                }
            }
        }


    },
    queryMetadata: async ({request, locals}) => {
        const querySchema = z.object({
            query: z.string().trim().min(1).max(255),
            year: z.string().optional().nullable().transform(v => v ? parseInt(v) : undefined)
        })

        const formData = Object.fromEntries(await request.formData())

        const queryData = querySchema.safeParse(formData)

        if (!queryData.success) {
            const errors = queryData.error.errors.map(error => ({
                field: error.path[0],
                message: error.message
            }))

            return fail(400, {error: true, errors})
        }

        const data = await queryMovie(queryData.data.query, queryData.data.year)

        return {
            success: true,
            data
        }
    },
    publish: async ({request, locals}) => {
        const {user} = await authenticated(locals)

        const formData = Object.fromEntries(await request.formData())

        const publishSchema = z.object({
            fileUploadId: z.coerce.number().positive().int(),
            tmdbId: z.coerce.number().positive().int(),
        })

        type PublishData = z.infer<typeof publishSchema>

        let publishData : PublishData
        try {
            publishData = publishSchema.parse(formData)
        } catch (e : ZodError) {
            const errors = e.errors.map(error => ({
                field: error.path[0],
                message: error.message
            }))

            return fail(400, {error: true, errors})
        }

        publishMovie(publishData.fileUploadId, publishData.tmdbId)

        return redirect(302, "/")
    }
} satisfies Actions;