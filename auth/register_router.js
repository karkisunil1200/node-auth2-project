const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../users/user-model');

const router = express.Router();

router.post('/', (req, res) => {
  const user = req.body;

  const ROUNDS = process.env.HASHING_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, ROUNDS);

  user.password = hash;
  User.add(user)
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      res.status(500).json({message: 'Registration failed', error: err.message});
    });
});

module.exports = router;
