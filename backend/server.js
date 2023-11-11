const express = require('express');
const app = express();
const port = 3000;


const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_username',
  password: 'your_password',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'your_database_name'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};


const routes = require('./routes');

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});