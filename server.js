const express = require('express');
const path = require('path');
const app = express();
const { Client } = require('pg');
const bodyParser = require('body-parser');
require('dotenv').config();
const { DATABASE_URL } = process.env;


app.use('/', express.static(path.resolve(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/employee/list', (req, res) => {
  const client = new Client({
    connectionString: DATABASE_URL,
  });
  client.connect()
  .then( () => {
    return client.query('SELECT * FROM employee');
  })
  .then((results) => {
    console.log('results? ', results);
    res.send({
      employees: results.rows
    });
  })
  .catch((err) => {
    res.send('something bad happened')
  });
});

app.get('/employee/list/:id', (req, res) => {
  const client = new Client({
    connectionString: DATABASE_URL,
  });
  client.connect()
  .then( () => {
    const sql = 'SELECT name, id FROM employee WHERE id = $1;';
    const params = [req.params.id];
    return client.query(sql, params)
  })
  .then((results) => {
    console.log('results.rows[0]?', results.rows[0]);
    res.send({
      employee: results.rows[0]
    });
  })
  .catch((err) => {
    res.send('Something bad happened')
  });
});

app.post('/employee/add', (req, res) => {
  const client = new Client({
    connectionString: DATABASE_URL,
  });
  client.connect()
  .then( () => {
    const sql = 'INSERT INTO employee (name) VALUES ($1);';
    const params = [req.body.name];
    return client.query(sql, params)
  })
  .then((result) => {
    console.log('results?', result);
    res.redirect('/employee/list');
  })
  .catch((err) => {
    console.log('err', err);
    res.redirect('/employee/list');
  });
});

app.post('/employee/edit/:id', (req, res) => {
  const client = new Client({
    connectionString: DATABASE_URL,
  });
  client.connect()
  .then(() => {
    const sql = 'UPDATE employee SET name = ($1) WHERE id = ($2);';
    const params = [req.body.name, req.params.id];
    return client.query(sql, params)
  })
  .then(() => {
    res.send("Edition successful!");
  })
  .catch((err) => {
    res.send('Something bad happened');
  });
});

app.get('/employee/delete/:id', (req, res) => {
  const client = new Client({
    connectionString: DATABASE_URL,
  });
  client.connect()
  .then(() => {
    const sql = 'DELETE FROM employee WHERE id = ($1);';
    const params = [req.params.id];
    return client.query(sql, params)
  })
  .then( () => {
    return client.query('SELECT * FROM employee;');
  })
  .then((results) => {
    res.send({
      employees: results.rows
    });
  })
  .catch((err) => {
    res.send('something bad happened')
  });
});

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(process.env.PORT, () => {
  console.log("DATABASE_URL", DATABASE_URL)
  console.log(`Listening on port ${process.env.PORT}`);
});
