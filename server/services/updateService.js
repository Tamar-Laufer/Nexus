const { serverError, validateItem } = require('../utils/helpers');

const update = async (res, getByIdFn, updateFn, id, body, isOwner, resource) => {
  try {
    const existing = await validateItem(res, getByIdFn, id, isOwner, resource);
    if (!existing) return;
    res.json(await updateFn(id, body));
  } catch (err) { serverError(res, err); }
};

module.exports = { update };
