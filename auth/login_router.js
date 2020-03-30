const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../users/user-model');

const router = express.Router();

router.post('/', (req, res) => {
  const {username, password} = req.body;
  //   console.log({password});

  User.findBy({username})
    .first()
    .then(user => {
      //   console.log(user.password);
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = {
          id: user.id,
          username: user.username
        };
        res.status(200).json({hello: `Welcome ${user.username}`});
      } else {
        res.status(401).json({message: 'username or password did not match'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'User not found', error: err.message});
    });
});

module.exports = router;
