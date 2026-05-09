const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setup() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tamar4212',
    multipleStatements: true
  });

  console.log('Connected to MySQL');

  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await connection.query(schema);
  console.log('Schema created successfully');

  const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
  await connection.query(seed);
  console.log('Seed data inserted successfully');

  await connection.end();
  console.log('Done! Database is ready.');
}

setup().catch(err => {
  console.error('Setup error:', err.message);
  process.exit(1);
});
