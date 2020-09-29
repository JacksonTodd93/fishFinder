const mysql = require('mysql');

var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'fishFinder',
});

dbConnection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('Database connected');
});

module.exports.dbConnection = dbConnection;
