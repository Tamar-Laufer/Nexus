const { serverError } = require('../utils/helpers');

// GET - שליפת פריטים, תומך בכל מספר פרמטרים (פילטר, פגינציה וכו')
const getAll = async (res, getAllFn, ...args) => {
  try {
    res.json(await getAllFn(...args));
  } catch (err) { serverError(res, err); }
};

module.exports = { getAll };
