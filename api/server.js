const express = require('express');
const usersRouter = require('../users/user-router');
const registerRouter = require('../auth/register_router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send({server: 'up'});
});

server.use('/api/users', usersRouter);
server.use('/api/register', registerRouter);

module.exports = server;
