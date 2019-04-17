const express = require('express');
const app = express();
const { Pool } = require('pg');
const port = process.env.PORT || 8080;
const client = new Pool();

const pgQuery = async (queryString, queryParams) => {
  const res = await client.query(queryString, queryParams);
  return res;
}

client
  .query('CREATE TABLE IF NOT EXISTS Users (id SERIAL, name TEXT)')
  .catch((err) => console.log(err));

app.get('/', async (req, res) => {
  const queryResponse = await pgQuery('SELECT * FROM users', []);
  res.json({
    body: queryResponse
  });
});

// app.post('/create/users', async (req, res) => {
  
// });
//INSERT INTO users(text) name($1)

app.listen(port, () => {
  console.log(`Ali, I'm listening`);
});