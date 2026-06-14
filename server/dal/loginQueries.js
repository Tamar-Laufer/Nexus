const db = require('./connection');
const { getUserById } = require('./usersQueries');

const login = async (username, password) => {
  const [rows] = await db.query(
    `SELECT u.id FROM users u
     JOIN passwords p ON u.id = p.userId
     WHERE u.username = ? AND p.password = ?`,
    [username, password]
  );
  if (rows.length === 0) return null;
  return getUserById(rows[0].id);
};

module.exports = { login };
