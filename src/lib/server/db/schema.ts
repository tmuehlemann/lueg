import {text, timestamp, serial, mysqlTable} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
});