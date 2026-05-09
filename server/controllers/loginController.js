const { login } = require('../db/loginQueries');
const { serverError } = require('../utils/helpers');

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required' });
  try {
    const user = await login(username, password);
    if (!user) return res.status(401).json({ message: 'Incorrect username or password' });
    res.json(user);
  } catch (err) { serverError(res, err); }
};

module.exports = { handleLogin };
