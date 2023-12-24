CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_name_unique` UNIQUE(`name`)
);
