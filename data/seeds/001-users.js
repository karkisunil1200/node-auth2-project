exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'test', password: 'test', department: 'web-development'},
        {id: 2, username: 'test02', password: 'test', department: 'biology'}
      ]);
    });
};
