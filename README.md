## Project setup

To install required dependencies run:

```bash
$ npm install
```

Add `.env` file in the project root directory with following content:

```
API_KEY=...
```

or setup this environment variable when running project:

```bash
# bash
API_KEY=... npm run start

# cmd
set API_KEY=... && npm run start

# powershell
$env:API_KEY="..."; npm run start
```

## Compile and run the project

To run application:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Open your browser on address:

```
localhost:3000/
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
