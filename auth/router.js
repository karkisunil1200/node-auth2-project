const express = require('express');
const bcryptjs = require('bcryptjs');
const Users = require('../users/user-model');
const {isValid} = require('../users/user-services');

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

module.exports = router;
