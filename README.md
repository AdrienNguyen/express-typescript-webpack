# express-typescript-webpack

Express server boilerplate with typescript and webpack. The project helps developers quickly create new backend project in the future.

## Install package

-   Node
-   Npm
-   MongoDb
-   Pm2

## Set up evironment variables

```sh
cp .env.example .env
```

Edit .env file:

-   PORT=8080 (port of server)
-   NODE_ENV=development (node enviroment)
-   DB_AUTHENTICATE=false (is database authenticated?)
-   DB_HOST=127.0.0.1 (database host)
-   DB_PORT=27017 (database port)
-   DB_NAME=ExTyDB (database name)
-   DB_USERNAME= (database username)
-   DB_PASSWORD= (database password)
-   JWT_KEY=secret_key_not_share (secret key for authenticating user)

## Set up dev environment

```sh
npm install
```

```sh
npm run postinstall
```

```sh
npm run dev
```

## Set up production environment

### Build project and test production mode

```sh
npm run build
```

### Run production mode with pm2

```sh
npm run start-pm2
```

The copyright belongs to [Adrien Nguyen](https://adriennguyen.github.io/portfolio/)
