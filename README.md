# How to run Zombie Task app

## Tools and technologies you need

1. PostgreSQL database or use prepared docker image
2. NPM and Node.JS (version 10.15.3 forced by `nvm use`)

## How to install Application

1. Copy and edit `.env.dist` to `.env` file according to your needs (PostgreSQL database)
2. Install globally `typescript` and `tsc` packages (depends on your OS)
3. Run `nvm use && npm ci` to install all required dependencies

## How to run locally

The easiest way to run app is to follow those commands:

- `migrate:dev` - to run migrations directly from TS files
- `start:dev` to run app with nodemon
- `start:debug` - to debug application with nodemon
- `start:local` - to start application with ts-node (without nodemon)

## Build and prepare for live

Use following scripts to achieve this:

- `build` - transpiles TS files to pure JS
- `migration:run` - run migrations for database
- `start` - run JS compiled application

## Swagger

Swagger API Docs will genenerate automatically when you restart the app.

- Documentation is available at: `{YOUR_APP_BASE_URL}/docs/api`

## Contact

Any comments or thoughts? I appreciate any kind of feedback here: [grzegorz.bar@icloud.com](mailto:grzegorz.bar@icloud.com)
