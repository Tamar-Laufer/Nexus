const { serverError, stripId } = require('../utils/helpers');

// POST - יצירת פריט חדש (מסיר id שהקליינט שולח)
const create = async (res, createFn, body) => {
  try {
    res.status(201).json(await createFn(stripId(body)));
  } catch (err) { serverError(res, err); }
};

module.exports = { create };
