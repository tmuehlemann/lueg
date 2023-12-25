import {db} from "$lib/server/db/db";
import {key, session, user} from "$lib/server/db/schema";
import {exit} from "process";
import {auth} from "$lib/server/lucia"
import {createUser} from "$lib/server/user";


const args = process.argv.slice(2)

if (args.includes('--clean') || process.env.npm_config_clean) {
    console.log('cleaning')
    await db.delete(session)
    await db.delete(key)
    await db.delete(user)
}

console.log('seeding ...')

const user = await createUser("admin", "password")

console.log('done')
exit(0)