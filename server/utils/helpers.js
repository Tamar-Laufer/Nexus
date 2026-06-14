const notFound = (res, resource = 'Item') =>
  res.status(404).json({ message: `${resource} not found` });

const notAuthorized = (res) =>
  res.status(403).json({ message: 'Not authorized' });

const serverError = (res, err) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
};

const stripId = (body) => {
  const { id, ...data } = body;
  return data;
};

const validateItem = async (res, getById, id, isOwner, resource) => {
  const existing = await getById(id);
  if (!existing) { notFound(res, resource); return null; }
  if (!isOwner(existing)) { notAuthorized(res); return null; }
  return existing;
};

module.exports = { notFound, notAuthorized, serverError, stripId, validateItem };
