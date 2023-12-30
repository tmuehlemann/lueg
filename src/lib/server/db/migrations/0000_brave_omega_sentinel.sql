CREATE TABLE `file_upload` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`uploader_id` varchar(15) NOT NULL,
	`path` text NOT NULL,
	`uploaded_at` timestamp NOT NULL DEFAULT (now()),
	`movie_id` int,
	CONSTRAINT `file_upload_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `genre` (
	`id` bigint unsigned NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `genre_id` PRIMARY KEY(`id`),
	CONSTRAINT `genre_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_key` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`hashed_password` varchar(255),
	CONSTRAINT `user_key_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `movie` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`tmdb_id` int NOT NULL,
	`imdb_id` varchar(255),
	`original_language` varchar(255) NOT NULL,
	`original_title` varchar(255) NOT NULL,
	`overview` text NOT NULL,
	`poster_path` varchar(255),
	`release_date` date NOT NULL,
	`runtime` int,
	`status` varchar(255) NOT NULL,
	`tagline` text,
	`title` text NOT NULL,
	`revenue` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `movie_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `movie_to_genre` (
	`movie_id` bigint unsigned NOT NULL,
	`genre_id` bigint unsigned NOT NULL,
	CONSTRAINT `movie_to_genre_movie_id_genre_id_pk` PRIMARY KEY(`movie_id`,`genre_id`)
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` varchar(128) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`active_expires` bigint NOT NULL,
	`idle_expires` bigint NOT NULL,
	CONSTRAINT `user_session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `auth_user` (
	`id` varchar(15) NOT NULL,
	`username` varchar(255) NOT NULL,
	CONSTRAINT `auth_user_id` PRIMARY KEY(`id`),
	CONSTRAINT `auth_user_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `user_key` ADD CONSTRAINT `user_key_user_id_auth_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `movie_to_genre` ADD CONSTRAINT `movie_to_genre_movie_id_movie_id_fk` FOREIGN KEY (`movie_id`) REFERENCES `movie`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `movie_to_genre` ADD CONSTRAINT `movie_to_genre_genre_id_genre_id_fk` FOREIGN KEY (`genre_id`) REFERENCES `genre`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_session` ADD CONSTRAINT `user_session_user_id_auth_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE no action ON UPDATE no action;