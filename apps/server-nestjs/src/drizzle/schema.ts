import {
  bigint,
  char,
  date,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('name', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }),
});

export const movies = pgTable('movie', {
  id: serial('id').primaryKey(),

  // metadata - copied from tmdb
  backdropPath: varchar('backdrop_path', { length: 255 }),
  budget: integer('budget'),
  tmdbId: integer('tmdb_id').notNull(),
  imdbId: varchar('imdb_id', { length: 255 }),
  originalLanguage: varchar('original_language', { length: 255 }).notNull(),
  originalTitle: varchar('original_title', { length: 255 }).notNull(),
  overview: text('overview').notNull(),
  posterPath: varchar('poster_path', { length: 255 }),
  releaseDate: date('release_date').notNull(),
  runtime: integer('runtime'),
  status: varchar('status', { length: 255 }).notNull(),
  tagline: text('tagline'),
  title: text('title').notNull(),
  revenue: integer('revenue'),

  // custom metadata
  fgColor: char('fg_color', { length: 7 }),
  bgColor: char('bg_color', { length: 7 }),
  primaryColor: char('primary_color', { length: 7 }),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const genre = pgTable('genre', {
  id: bigint('id', { mode: 'number' }).unique().notNull().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const genreRelations = relations(genre, ({ many }) => ({
  movieToGenre: many(movieToGenre),
}));

export const movieToGenre = pgTable(
  'movie_to_genre',
  {
    movieId: bigint('movie_id', { mode: 'number' })
      .notNull()
      .references(() => movies.id),
    genreId: bigint('genre_id', { mode: 'number' })
      .notNull()
      .references(() => genre.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.movieId, t.genreId] }),
  }),
);

export const movieToGenreRelations = relations(movieToGenre, ({ one }) => ({
  movie: one(movies, {
    fields: [movieToGenre.movieId],
    references: [movies.id],
  }),
  genre: one(genre, {
    fields: [movieToGenre.genreId],
    references: [genre.id],
  }),
}));

export const mediaFile = pgTable('mediafile', {
  path: text('path').notNull().unique().primaryKey(),
  scannedAt: timestamp('scanned_at').defaultNow().notNull(),
  movieId: integer('movie_id'),
});

export const mediaFileRelations = relations(mediaFile, ({ one }) => ({
  movie: one(movies, {
    fields: [mediaFile.movieId],
    references: [movies.id],
  }),
}));
