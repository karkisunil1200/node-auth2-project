const db = require('../data/dbConfig');

function find() {
  return db.select('id', 'username', 'password', 'department').from('users');
}

module.exports = {
  find
};
