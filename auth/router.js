const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/user-model');
const {isValid} = require('../users/user-services');
const secret = require('../config/vars');

const router = express.Router();

router.post('/register', (req, res) => {
  const credentials = req.body;
  console.log(credentials);

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;

    Users.addUsers(credentials)
      .then(user => {
        res.status(200).json({data: user});
      })
      .catch(err => {
        res.status(500).json({error: err.message});
      });
  } else {
    res.status(400).json({error: 'please enter username or password'});
  }
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  if (isValid(req.body)) {
    Users.findBy({username})
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = createToken(user);
          res.status(200).json({welcome: username, token});
        } else {
          res.status(400).json({error: 'Invalid credentials'});
        }
      })
      .catch(err => {
        res.status(500).json({error: err.message});
      });
  } else {
    res.status(400).json({error: 'please enter username and password'});
  }
});

function createToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
