const express = require('express');
const session = require('express-session');

const usersRouter = require('../users/user-router');
const registerRouter = require('../auth/register_router');
const loginRouter = require('../auth/login_router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send({server: 'up'});
});

const sessionConfig = {
  name: 'cookie',
  secret: 'Super secret',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true
};

server.use(session(sessionConfig));
server.use('/api/users', usersRouter);
server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);

module.exports = server;
