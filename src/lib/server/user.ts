import {auth} from "$lib/server/lucia";
import Locals = App.Locals;
import {LuciaError} from "lucia";
import {fail, redirect} from "@sveltejs/kit";
import {expoOut} from "svelte/easing";
import {db} from "$lib/server/db/db";

export async function createUser(username : string, password : string) {

    return await auth.createUser({
        key: {
            providerId: "username",
            providerUserId: username.toLowerCase(),
            password
        },
        attributes: {
            username
        }
    })
}

export async function getUserByUsername(username: string) {
    const dbUser = await db.query.user.findFirst({
        where: (user, {eq}) => eq(user.username, username)
    })

    if (!dbUser?.id) throw new Error("User not found")

    return auth.getUser(dbUser.id)
}

export async function login(username : string, password : string, locals : Locals) : Promise<boolean> {
    try {
        // find user by key
        // and validate password
        const key = await auth.useKey(
            "username",
            username.toLowerCase(),
            password
        );
        const session = await auth.createSession({
            userId: key.userId,
            attributes: {}
        });
        locals.auth.setSession(session); // set session cookie
        return true;
    } catch(e) {

        if (e instanceof LuciaError) {

            if (e.message === "AUTH_INVALID_KEY_ID") {
                console.log("someone tried to login with a username that doesn't exist")
            }

            if (e.message === "AUTH_INVALID_PASSWORD") {
                console.log("someone tried to login with an invalid password")
            }
        } else {
            console.log("Error while logging in. ", e)
        }

        return false;
    }
}

/**
 * @returns true if logout was successful, false if not
 */
export async function logout(locals : Locals): Promise<boolean> {
    const session = await locals.auth.validate()
    if(!session) return false;

    await auth.invalidateSession(session.sessionId)
    locals.auth.setSession(null)
    return true
}


export async function authenticated(locals : Locals) {
    const session = await locals.auth.validate()
    if (!session) throw redirect(302, "/login")
    return session
}