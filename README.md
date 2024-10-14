# Stencil Server

## Getting Started
Create a Postgres database and create a db called `posts` and another called `test-posts`. Create a db user and password. Afterwards, create a `.env` file in the root directory and provide the db user `username` and `password` and use them as the `USERNAME` and `PASSWORD` env variable values listed in the `.env.example`. Create a `token secret` for the `jwt` being generated on the server (and in tests). After creating a `token secret` use that as your `TOKEN_SECRET` variable in your `.env` file. After the environment variables have been created run
```
npm install
```
to install dependencies.

## Development
To run the server in development run the command 
```
npm run dev
```
This will start the `index.ts` file in the `src` directory using `nodemon`. `nodemon` will watch for file changes in the `src` directory and ignore changes in any file that ends with `.test.ts`. Successfully starting should log the port you are listening on and the connected to db message.

## Testing
To run jest tests in the `src` directory, run
```
npm test
```
When testing, it will run verbose logging so that you can see the individual test titles and suites that are running. The `--detectOpenHandles` flag is used because of syncing issues with `postgres` since you are connecting to a live database. Attempting to `force sync` a table might cause another test in a different suite to fail because tests are run in parallel by default. Adding that flag will allow the tests to run sequentially. This makes the tests run a little slower, but ensures that one suite isn't trying to access a table that has been dropped by another suite when syncing in the middle of test runs.

When running tests the `TOKEN_SECRET` environment variable is reassigned for testing purposes.

## Build
To build the code run the command
```
npm run build
```
This will bundle everything in the `src` directory and output to a directory called `build` in the root dir.


## Endpoints
This server uses swagger ui to document the api. You can find the docs when the server is started by visiting `http://localhost:8080/docs`