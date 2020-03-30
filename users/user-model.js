const db = require('../data/dbConfig');

function find() {
  return db.select('id', 'username', 'password', 'department').from('users');
}

function add(user) {
  //   console.log('coming from model', user);
  return db('users').insert(user);
}

function findBy(user) {
  //   console.log('coming from model, ', user);
  return db
    .select('*')
    .from('users')
    .where(user);
}

module.exports = {
  find,
  add,
  findBy
};
