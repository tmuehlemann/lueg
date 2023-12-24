import {db} from "$lib/server/db/db";
import {users} from "$lib/server/db/schema";
import {exit} from "process";


const args = process.argv.slice(2)

if (args.includes('--clean') || process.env.npm_config_clean) {
    await db.delete(users)
}

await db.insert(users).values([
    {
        name: "John Doe"
    }, {
        name: "Alice Smith"
    }
])

console.log('seeded')
exit(0)