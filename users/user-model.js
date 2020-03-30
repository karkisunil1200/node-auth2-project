const db = require('../data/dbConfig');

function find() {
  return db.select('id', 'username', 'password', 'department').from('users');
}

function add(user) {
  //   console.log('coming from model', user);
  return db('users').insert(user);
}

module.exports = {
  find,
  add
};
