const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'tamar4212',
  database: 'jsonplaceholder',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool.promise();
