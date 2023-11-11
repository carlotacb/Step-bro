const express = require('express');
const app = express();

require('dotenv').config()

const { Pool } = require('pg');



const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // default Postgres port
  database: process.env.DB_NAME
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};



const port = process.env.PORT;


const routes = require('./routes');

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});