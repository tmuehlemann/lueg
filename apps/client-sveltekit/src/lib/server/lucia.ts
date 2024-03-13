import {lucia} from "lucia";
import {sveltekit} from "lucia/middleware"
import { mysql2 } from "@lucia-auth/adapter-mysql";
import {dev} from "$app/environment";
import {pool} from "$lib/server/db/db";
import {luciaTableNames} from "$lib/server/db/schema";

export const auth = lucia({
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),
    adapter: mysql2(pool, luciaTableNames),

    getUserAttributes: (data) => {
        return {
            username: data.username
        }
    }
})

export type Auth = typeof auth;