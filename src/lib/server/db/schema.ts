import {text, timestamp, serial, mysqlTable, varchar, bigint} from "drizzle-orm/mysql-core";
import {string} from "zod";

export const luciaTableNames = {
    user : "auth_user",
    key : "user_key",
    session : "user_session"
}

export const user = mysqlTable(luciaTableNames.user, {
    id: varchar("id", {
        length: 15 // change this when using custom user ids
    }).primaryKey(),
    username: varchar("username", {length: 255}).notNull().unique(),
});

export const key = mysqlTable(luciaTableNames.key, {
    id: varchar("id", {
        length: 255
    }).primaryKey(),
    userId: varchar("user_id", {
        length: 15
    })
        .notNull()
        .references(() => user.id),
    hashedPassword: varchar("hashed_password", {
        length: 255
    })
});

export const session = mysqlTable(luciaTableNames.session, {
    id: varchar("id", {
        length: 128
    }).primaryKey(),
    userId: varchar("user_id", {
        length: 15
    })
        .notNull()
        .references(() => user.id),
    activeExpires: bigint("active_expires", {
        mode: "number"
    }).notNull(),
    idleExpires: bigint("idle_expires", {
        mode: "number"
    }).notNull()
});
