# Lueg
Lueg (/luɛg/) is a Swiss German term synonymous with "look" or "watch."

It's a simple web app I built using SvelteKit for managing and enjoying your media collection.

## Developing

**_Make sure you have [set up the MySQL database](#setting-up-the-database) (see below)._**

Once you've installed all dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Setting up the database

Lueg uses a MySQL database to store your media collection.

1. Create a new database for Lueg.
```bash
mysqladmin -u root create lueg
```
2. Create a `.env` file in the root of the project and add the following:
```dotenv
# example .env file with default values for local development
DB_HOST='localhost'
DB_PORT=3306
DB_USERNAME='root'
DB_PASSWORD=''
DB_DATABASE='lueg'
```
3. Run the Migration script to create the tables in your database:
```bash
npm run db:migrate
```
4. [Seed](https://en.wikipedia.org/wiki/Database_seeding) the database with some sample data:
```bash
npm run db:seed
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
