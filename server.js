const { Pool } = require('pg')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.use('/', express.static(path.resolve(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app
  // .use(express.static(path.join(__dirname, '')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/index'))
  .get('/db', async (req, res) => {
    res.send(JSON.stringify({ Hello: ‘World’}));
    // try {
    //   const client = await pool.connect()
    //   const result = await client.query("SELECT * FROM employee");
    //   const results = {'results': (result) ? result.rows : null};
    //   res.render('pages/db', results);
    //   client.release();
    // } catch (err) {
    //   console.error("Error_c! : ", err);
    //   res.send("Error_b!!! :" + err);
    // }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



// const express = require('express');
// const path = require('path');
// const app = express();
// const { Client } = require('pg');
// const bodyParser = require('body-parser');
// require('dotenv').config();
//
//
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
//
// app.use('/', express.static(path.resolve(__dirname, 'dist')));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
//
//
// app.get('/employee/list', (req, res) => {
//   const client = new Client();
//   client.connect()
//   .then( () => {
//     return client.query('SELECT * FROM employee ORDER BY employee_id;');
//   })
//   .then((results) => {
//     console.log('results? ', results);
//     res.send({
//       employees: results.rows
//     });
//   })
//   .catch((err) => {
//     res.send('something bad happened')
//   });
// });
//
//
// app.get('/employee/list/:id', (req, res) => {
//   const client = new Client();
//   client.connect()
//   .then( () => {
//     const sql = 'SELECT employee_name, employee_id FROM employee WHERE employee_id = $1;';
//     const params = [req.params.id];
//     return client.query(sql, params)
//   })
//   .then((results) => {
//     console.log('results.rows[0]?', results.rows[0]);
//     res.send({
//       employee: results.rows[0]
//     });
//   })
//   .catch((err) => {
//     res.send('something bad happened')
//   });
// });
//
//
// app.post('/employee/add', (req, res) => {
//   const client = new Client();
//   client.connect()
//   .then( () => {
//     const sql = 'INSERT INTO employee (employee_name) VALUES ($1);';
//     const params = [req.body.name];
//     return client.query(sql, params)
//   })
//   .then((result) => {
//     console.log('results?', result);
//     res.redirect('/employee/list');
//   })
//   .catch((err) => {
//     console.log('err', err);
//     res.redirect('/employee/list');
//   });
// });
//
//
// app.post('/employee/edit/:id', (req, res) => {
//   const client = new Client();
//   client.connect()
//   .then(() => {
//     const sql = 'UPDATE employee SET employee_name = ($1) WHERE employee_id = ($2);';
//     const params = [req.body.name, req.params.id];
//     return client.query(sql, params)
//   })
//   .then(() => {
//     res.send("Edition successful!");
//   })
//   .catch((err) => {
//     res.send('Something bad happened');
//   });
// });
//
//
// app.get('/employee/delete/:id', (req, res) => {
//   const client = new Client();
//   client.connect()
//   .then(() => {
//     const sql = 'DELETE FROM employee WHERE employee_id = ($1);';
//     const params = [req.params.id];
//     return client.query(sql, params)
//   })
//   .then( () => {
//     return client.query('SELECT * FROM employee;');
//   })
//   .then((results) => {
//     res.send({
//       employees: results.rows
//     });
//   })
//   .catch((err) => {
//     res.send('something bad happened')
//   });
// });
//
//
// app.get('*', function (request, response){
//       response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
//     })
//
// app.listen(process.env.PORT, () => {
//   console.log(`Listening on port ${process.env.PORT}`);
// });
