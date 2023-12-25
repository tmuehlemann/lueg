import type {Actions} from "@sveltejs/kit";
import {z} from "zod";
import {fail, redirect} from "@sveltejs/kit";
import {login} from "$lib/server/user";
import {LuciaError} from "lucia";


const loginSchema = z.object({
    username: z.string().trim().min(1).max(255),
    password: z.string().min(5).max(255)
})

export const actions : Actions = {
    login: async ({request, locals}) => {
        const formData = Object.fromEntries(await request.formData())

        const loginData = loginSchema.safeParse(formData)

        if (!loginData.success) {

            const errors = loginData.error.errors.map(error => ({
                field: error.path[0],
                message: error.message
            }))

            return fail(400, {error: true, errors})
        }

        if(!await login(loginData.data.username, loginData.data.password, locals)) {
            return fail(400, {
                error: true,
                errors: [{
                    message: "Incorrect username or password"
                }]
            });
        }

        throw redirect(302, "/")
    }

} satisfies Actions;