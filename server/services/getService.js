const { serverError } = require('../utils/helpers');

const getAll = async (res, getAllFn, ...args) => {
  try {
    res.json(await getAllFn(...args));
  } catch (err) { serverError(res, err); }
};

module.exports = { getAll };
