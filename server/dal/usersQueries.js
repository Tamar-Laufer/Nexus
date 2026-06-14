const { selectAll, selectById, updateRow, insertRowAutoId, existsByFields, updateByField } = require('./baseQueries');

const toUserObject = (row) => ({
  id: row.id,
  name: row.name,
  username: row.username,
  email: row.email,
  phone: row.phone,
  address: {
    street: row.address_street,
    suite: row.address_suite,
    city: row.address_city,
    zipcode: row.address_zipcode,
    geo: { lat: row.address_lat, lng: row.address_lng }
  },
  company: {
    name: row.company_name,
    catchPhrase: row.company_catchphrase,
    bs: row.company_bs
  }
});

const toUser = (row) => row ? toUserObject(row) : null;

const getAllUsers  = async ()   => (await selectAll('users')).map(toUserObject);
const getUserById = async (id) => toUser(await selectById('users', id));

const createUser = async (user) => {
  const addr = user.address || {}, geo = addr.geo || {}, comp = user.company || {};
  return toUser(await insertRowAutoId('users',
    ['name', 'username', 'email', 'phone',
     'address_street', 'address_suite', 'address_city', 'address_zipcode', 'address_lat', 'address_lng',
     'company_name', 'company_catchphrase', 'company_bs'],
    [user.name || '', user.username, user.email || '', user.phone || '',
     addr.street || '', addr.suite || '', addr.city || '', addr.zipcode || '',
     geo.lat || '', geo.lng || '',
     comp.name || '', comp.catchPhrase || '', comp.bs || '']
  ));
};

const updateUser = async (id, user) => {
  const addr = user.address || {}, comp = user.company || {};
  return toUser(await updateRow('users',
    ['name', 'email', 'phone', 'address_street', 'address_city', 'company_name'],
    [user.name || '', user.email || '', user.phone || '',
     addr.street || '', addr.city || '', comp.name || ''],
    id
  ));
};

const updateUsername = async (id, username) =>
  toUser(await updateRow('users', ['username'], [username], id));

const createPassword = (userId, password) =>
  insertRowAutoId('passwords', ['userId', 'password'], [userId, password]);

const verifyPassword = (userId, password) =>
  existsByFields('passwords', { userId, password });

const updatePassword = (userId, newPassword) =>
  updateByField('passwords', ['password'], [newPassword], 'userId', userId);

module.exports = { getAllUsers, getUserById, createUser, updateUser, updateUsername, createPassword, verifyPassword, updatePassword };
