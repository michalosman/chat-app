# Chat App MERN

Realtime **Chat App** created with MERN stack.

## Features

### Guest

- [x] Sign up
- [x] Sign in

### User

- [x] Create and delete private chats
- [x] Create new messages
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

- React
- Redux
- Material UI

### Backend

- Node.js
- Express
- MongoDB
- Socket.io
- JWT

## Geting started

### Clone repository

```
git clone https://github.com/michalosman/chat-app-mern.git
cd chat-app-mern
```

### Client setup

Create a .env file in the client directory and set up the following environment variables

```
REACT_APP_SERVER_URL='Address of the server'
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
PORT='The port the server will run on'
MONGO_URI='Your MongoDB database URI'
SECRET_KEY='Passwords encryption secret key'
CLIENT_URL='Address of the client'
```

Install packages and start server

```
cd server
npm install
npm start
```
