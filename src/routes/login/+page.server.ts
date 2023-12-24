import type {Actions} from "@sveltejs/kit";
import {z} from "zod";
import {fail} from "@sveltejs/kit";


const loginSchema = z.object({
    username: z.string().trim().min(1).max(255),
    password: z.string().min(5).max(255)
})

export const actions : Actions = {
    login: async ({request}) => {
        const formData = Object.fromEntries(await request.formData())

        const loginData = loginSchema.safeParse(formData)

        if (!loginData.success) {

            const errors = loginData.error.errors.map(error => ({
                field: error.path[0],
                message: error.message
            }))

            return fail(400, {error: true, errors})
        }


        // if (!Auth.login(loginData.data.username, loginData.data.password)) {
        //     return fail(400, {error: true, errors: [{field: "", message: "Username or password is incorrect"}]})
        // }

        return {
            success: true
        }
    }

} satisfies Actions;