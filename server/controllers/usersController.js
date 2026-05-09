const { getAllUsers, getUserById, createUser, updateUser, updateUsername, createPassword, verifyPassword, updatePassword } = require('../db/usersQueries');
const { notFound, serverError } = require('../utils/helpers');
const { getAll } = require('../services/getService');

const getUsers = (_req, res) => getAll(res, getAllUsers);

const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return notFound(res, 'User');
    res.json(user);
  } catch (err) { serverError(res, err); }
};

// postUser נשאר נפרד - יש לו לוגיקה מיוחדת של שמירת סיסמה
const postUser = async (req, res) => {
  try {
    const password = req.body.website;
    const newUser = await createUser(req.body);
    if (password) await createPassword(newUser.id, password);
    res.status(201).json(newUser);
  } catch (err) { serverError(res, err); }
};

// PUT /users/:id - עדכון פרטי משתמש (ללא username וסיסמה)
const putUser = async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    if (!user) return notFound(res, 'User');
    res.json(user);
  } catch (err) { serverError(res, err); }
};

// PUT /users/:id/credentials - עדכון שם משתמש ו/או סיסמה אחרי אימות סיסמה ישנה
const putCredentials = async (req, res) => {
  const { oldPassword, newUsername, newPassword } = req.body;
  try {
    const valid = await verifyPassword(req.params.id, oldPassword);
    if (!valid) return res.status(401).json({ message: 'Incorrect current password' });

    if (newUsername) await updateUsername(req.params.id, newUsername);
    if (newPassword) await updatePassword(req.params.id, newPassword);

    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (err) { serverError(res, err); }
};

module.exports = { getUsers, getUser, postUser, putUser, putCredentials };
