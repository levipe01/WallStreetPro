const db = require('./postgres_db.js');

const createWatchlistTable = () => {
  console.log('hey there')
  const sqlStringCreate = `CREATE TABLE watchlists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`;

  const sqlStringInsert = `INSERT INTO watchlists (name, user_id)
  VALUES ('Market Overview', 1),
         ('My Portfolio', 1)`;

  return db.query('DROP TABLE IF EXISTS watchlists')
    .then(() => db.query(sqlStringCreate))
    .then(() => db.query(sqlStringInsert))
    .catch((err) => err);
};

const createUserTable = () => {
  const sqlStringCreate = `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
  )`;

  const sqlStringInsert = `INSERT INTO users (name)
  VALUES ('levipe01')`;

  return db.query('DROP TABLE IF EXISTS users')
    .then(() => db.query(sqlStringCreate))
    .then(() => db.query(sqlStringInsert))
    .catch((err) => err);
};

const createSecuritiesTable = () => {
  const sqlStringCreate = `CREATE TABLE securities (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(50) NOT NULL
  )`;

  const sqlStringInsert = `INSERT INTO securities (id, name)
  VALUES ('AAPL', 'Apple, Inc.'),
         ('TSLA', 'Tesla, Inc.'),
         ('IBM', 'IBM Corp.'),
         ('KO', 'The Coca-Cola Co.'),
         ('PFE', 'Pfizer, Inc.'),
         ('INTC', 'Intel Corp.'),
         ('DOW', 'Dow, Inc.'),
         ('X', 'United Steel Corp.')`;

  return db.query('DROP TABLE IF EXISTS securities')
    .then(() => db.query(sqlStringCreate))
    .then(() => db.query(sqlStringInsert))
    .catch((err) => err);
};

createUserTable()
  .then(createWatchlistTable)
  .then(createSecuritiesTable)









