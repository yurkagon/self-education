# E-Menu

### Stack:

Typescript, Express, routing-controllers, mongodb, mongoose, React, Mobx, Sass

## Installation

1. Clone the repository
2. Get into the project folder
3. Run `yarn` to install packages
4. Create `.env` file
5. Copy data from `.env.sample` into `.env`
6. Add real environment variables

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the web application and serever in the development mode in same terminal.

### `yarn web`

Runs the web application in the development mode on 3000 port (by default).
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn server`

Runs server in development mode on 3001 port (by default).

### `yarn build`

Builds web and server applications for production use, generates static pages for web

### `yarn build:web`

Builds the web application for production use

### `yarn build:server`

Builds server for production use

### `yarn build:static-pages`

Generates static pages for web. Be sure the web app is already built by `yarn build:web`

### `yarn build:clean`

Clears the web app and server build folders

### `yarn start`

Runs the whole application in production mode. Be sure the project is already built by `yarn build`

### `yarn test`

Runs unit-testing

### `yarn pretty`

Format all files in the project using prettier.

### `yarn lint`

Check all files to find problems in the codebase

### `yarn analyze`

Runs `source-map-explorer` to explore the web app bundle chunk files. Be sure the project is already built by `yarn build`

### `yarn kill:web`

Kill the default the web app development port 3000

### `yarn kill:server`

Kill the default server development port 3001

### `yarn prod:logs`

Watching realtime logs on Heroku production server. You must be logged in on Heroku.

### `yarn prod:stop-building`

Stop building process on Heroku production server. You must be logged in on Heroku.

## API Documentation

Swagger available on http://localhost:3001/api-docs
