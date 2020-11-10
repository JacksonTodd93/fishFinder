const mysql = require('mysql');
const Promise = require('bluebird');


const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'fishFinder',
});

const db = Promise.promisifyAll(dbConnection, {multiArgs: true});

db.connectAsync()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

module.exports = db;
