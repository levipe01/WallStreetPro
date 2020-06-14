const db = require('./postgres_db.js');

const createWatchlistTable = () => {
  console.log('seeding...')
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
  ('X', 'United Steel Corp.'),
  ('SPY', 'SPDR S&P 500 ETF Trust'),
  ('VTI', 'Vanguard Total Stock Market ETF'),
  ('IEFA', 'iShares Core MSCI EAFE ETF'),
  ('GLD', 'SPDR Gold Trust'),
  ('VUG', 'Vanguard Growth ETF'),
  ('VTV', 'Vanguard Value ETF'),
  ('BND', 'Vanguard Total Bond Market ETF'),
  ('QQQ', 'Invesco QQQ')`;

  return db.query('DROP TABLE IF EXISTS securities')
    .then(() => db.query(sqlStringCreate))
    .then(() => db.query(sqlStringInsert))
    .catch((err) => err);
};

const createWatchlistSecuritiesTable = () => {
  const sqlStringCreate = `CREATE TABLE watchlists_securities (
    id SERIAL PRIMARY KEY,
    watchlist_id INTEGER NOT NULL,
    security_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (watchlist_id) REFERENCES watchlists (id),
    FOREIGN KEY (security_id) REFERENCES securities (id)
  )`;

  const sqlStringInsert = `INSERT INTO watchlists_securities (watchlist_id, security_id)
  VALUES (2, 'TSLA'),
         (2, 'AAPL'),
         (2, 'IBM'),
         (2, 'KO'),
         (2, 'PFE'),
         (2, 'INTC'),
         (2, 'DOW'),
         (2, 'X'),
         (1, 'SPY'),
         (1, 'VTI'),
         (1, 'IEFA'),
         (1, 'GLD'),
         (1, 'VUG'),
         (1, 'VTV'),
         (1, 'BND'),
         (1, 'QQQ')`;

  return db.query('DROP TABLE IF EXISTS watchlists_securities')
    .then(() => db.query(sqlStringCreate))
    .then(() => db.query(sqlStringInsert))
    .catch((err) => err);
};

createUserTable()
  .then(createWatchlistTable)
  .then(createSecuritiesTable)
  .then(createWatchlistSecuritiesTable);









