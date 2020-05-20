// Update with your config settings.

// const pgConnection = process.env.DATABASE_URL || 'postgresql://postgres@localhost/auth';

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/auth.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};

//   production: {
//     client: 'pg',
//     connection: {
//       connection: pgConnection
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       directory: './data/migrations'
//     },
//     seeds: {
//       directory: './data/seeds'
//     }
//   }
// };
