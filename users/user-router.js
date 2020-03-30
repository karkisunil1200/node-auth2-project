const express = require('express');
const Users = require('./user-model');

const router = express.Router();

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({message: 'users not found', error: err.message});
    });
});

router.post('/', (req, res) => {
  const user = req.body;

  Users.add(user)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({message: 'Something went wrong adding user', error: err.message});
    });
});

module.exports = router;
