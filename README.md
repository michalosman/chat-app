# Chat App

Realtime **Chat App** created with MERN stack. There's also an alternative backend version using a SQL database.

[Live Demo](https://chat-app-mern-mo.netlify.app/) :point_left:

## Features

### Guest

- [x] Sign up
- [x] Sign in

### User

- [x] Create and manage private chats
- [x] Create and manage group chats
- [x] Send messages
- [x] Report users

### Moderator

- [x] List users reports (able to warn reported user or close report)
- [x] Warn reported user
- [x] Close report

### Admin

- [x] List users warned 3 or more times
- [x] Ban user warned 3 or more times
- [x] List banned users
- [x] Unban user

## Technologies used

### Frontend

- JavaScript
- React
- Redux
- Material UI

### Backend

- JavaScript
- TypeScript
- Node.js
- Express
- Socket.io
- JWT

### Database

- MongoDB & Mongoose
- PostgreSQL & TypeORM

## Geting started

### Clone repository

```
git clone https://github.com/michalosman/chat-app.git
cd chat-app
```

### Client setup

Create a .env file in the client directory and set up the following environment variables

```
REACT_APP_SERVER_URL=<Address of the server, e.g. http://localhost:5000/>
```

Install packages and start client

```
cd client
npm install
npm start
```

### Server setup

Create a .env file in the server directory and set up the following environment variables

```
PORT=<The port the server will run on, e.g. 5000>
CLIENT_URL=<Address of the client, e.g. http://localhost:3000/>
SECRET_KEY=<Passwords encryption secret key, e.g. somesecretkey123>
MONGO_URI=<Your MongoDB database URI>
```

Install packages and start server

```
cd server
npm install
npm start
```

### SQL server setup (server-sql)

Create a .env file in the server directory and set up the following environment variables

```
PORT=<The port the server will run on, e.g. 5000>
CLIENT_URL=<Address of the client, e.g. http://localhost:3000/>
SECRET_KEY=<Passwords encryption secret key, e.g. somesecretkey123>
PG_HOST=<Postgres host, e.g. localhost >
PG_PORT=<Postgres port, e.g. 5432>
PG_USERNAME=<Postgres username>
PG_PASSWORD=<Postgres password>
PG_DATABASE=<Postgres database name, e.g. chatapp>
```

Install packages and start server

```
cd server
npm install
npm start
```

Migrations

- Generate

```
npm run migration:generate <name>
```

- Run

```
npm run migration:run
```

- Revert

```
npm run migration:revert
```
