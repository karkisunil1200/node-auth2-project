const express = require('express');
const usersRouter = require('../users/user-router');

const server = express();

server.get('/', (req, res) => {
  res.send({server: 'up'});
});

server.use('/api/users', usersRouter);

module.exports = server;
