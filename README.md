# Chat App MERN

Realtime **Chat App** created with MERN stack.

## Features

### Guest

- [x] Sign up
- [x] Sign in

### User

- [x] Create and delete private chats
- [x] Write messages and read them in real time
- [x] Report user
- [ ] Report an issue

### Moderator

- [ ] Respond to issue reports
- [ ] Create new problems categories?

### Admin

- [ ] Warn users
- [ ] Block users

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
```

```
cd server
npm install
npm start
```
