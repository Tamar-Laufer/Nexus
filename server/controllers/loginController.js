const { login } = require('../dal/loginQueries');
const { serverError } = require('../utils/helpers');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required' });
  try {
    const user = await login(username, password);
    if (!user) return res.status(401).json({ message: 'Incorrect username or password' });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user, token });
  } catch (err) { serverError(res, err); }
};

module.exports = { handleLogin };
