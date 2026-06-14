const { serverError, validateItem } = require('../utils/helpers');

const remove = async (res, getByIdFn, deleteFn, id, body, isOwner, resource) => {
  try {
    const existing = await validateItem(res, getByIdFn, id, isOwner, resource);
    if (!existing) return;
    await deleteFn(id);
    res.json(existing);
  } catch (err) { serverError(res, err); }
};

module.exports = { remove };
