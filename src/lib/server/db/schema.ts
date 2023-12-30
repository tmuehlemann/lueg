import {text, timestamp, serial, mysqlTable, varchar, bigint, int, datetime, date} from "drizzle-orm/mysql-core";
import {relations} from "drizzle-orm";

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

export const fileUpload = mysqlTable("file_upload", {
    id: serial("id").primaryKey(),
    uploaderId: varchar("uploader_id", {
        length: 15
    })
        .notNull(),
    path: text("path").notNull(),
    uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
    movieId: int("movie_id"),
});

export const fileUploadRelations = relations(fileUpload, ({one}) => ({
    uploader: one(user, {
        fields: [fileUpload.uploaderId],
        references: [user.id]
    }),
    movie: one(movie, {
        fields: [fileUpload.movieId],
        references: [movie.id]
    })
}))

export const userRelations = relations(user, ({ many }) => ({
    fileUploads: many(fileUpload),
}));

export const movie = mysqlTable("movie", {
    id: serial("id").primaryKey(),
    // metadata - copied from tmdb
    tmdbId: int("tmdb_id").notNull(),
    imdbId: varchar("imdb_id", {length: 255}),
    originalLanguage: varchar("original_language", {length: 255}).notNull(),
    originalTitle: varchar("original_title", {length: 255}).notNull(),
    overview: text("overview").notNull(),
    posterPath: varchar("poster_path", {length: 255}),
    releaseDate: date("release_date").notNull(),
    runtime: int("runtime"),
    status: varchar("status", {length: 255}).notNull(),
    tagline: text("tagline"),
    title: text("title").notNull(),
    revenue: int("revenue"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

const movieRelations = relations(movie, ({ many }) => ({
    fileUploads: many(fileUpload),
}));