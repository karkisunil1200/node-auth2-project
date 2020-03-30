const express = require('express');
const Users = require('./user-model');
const restricted = require('../auth/restriced-middleware');

const router = express.Router();

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({message: 'users not found', error: err.message});
    });
});

module.exports = router;
