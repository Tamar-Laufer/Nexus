const db = require('./connection'); // חיבור לדאטהבייס

// יצירת ID אקראי בטווח 100000-999999
const generateId = () => Math.floor(Math.random() * 900000) + 100000;

// שליפת כל השורות מטבלה, ממוינות לפי ID
const selectAll = async (table) => {
  const [rows] = await db.query(`SELECT * FROM ${table} ORDER BY id`);
  return rows;
};

// שליפת שורה יחידה לפי ID
const selectById = async (table, id) => {
  const [rows] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
  return rows[0] || null;
};

// שליפת שורות לפי שדה מסוים (לדוגמה: WHERE userId = ?)
const selectByField = async (table, field, value) => {
  const [rows] = await db.query(`SELECT * FROM ${table} WHERE ${field} = ? ORDER BY id`, [value]);
  return rows;
};

// שליפת שורות עם פגינציה (LIMIT + OFFSET)
const selectPaged = async (table, limit, offset) => {
  const [rows] = await db.query(
    `SELECT * FROM ${table} ORDER BY id LIMIT ? OFFSET ?`,
    [parseInt(limit), parseInt(offset)]
  );
  return rows;
};

// הוספת שורה חדשה עם ID אקראי - מחזיר את השורה שנוצרה
const insertRow = async (table, columns, values) => {
  const newId = generateId();
  const cols = ['id', ...columns].join(', ');
  const placeholders = Array(columns.length + 1).fill('?').join(', ');
  await db.query(`INSERT INTO ${table} (${cols}) VALUES (${placeholders})`, [newId, ...values]);
  return selectById(table, newId);
};

// עדכון שורה קיימת לפי ID - מחזיר את השורה המעודכנת
const updateRow = async (table, columns, values, id) => {
  const setClause = columns.map(c => `${c} = ?`).join(', ');
  await db.query(`UPDATE ${table} SET ${setClause} WHERE id = ?`, [...values, id]);
  return selectById(table, id);
};

// מחיקת שורה לפי ID
const deleteRow = async (table, id) => {
  await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
};

// הוספת שורה ללא ID אקראי - לטבלאות עם AUTO_INCREMENT (לדוגמה: passwords)
const insertRowAutoId = async (table, columns, values) => {
  const cols = columns.join(', ');
  const placeholders = columns.map(() => '?').join(', ');
  await db.query(`INSERT INTO ${table} (${cols}) VALUES (${placeholders})`, values);
};

// בדיקת קיום שורה לפי מספר תנאים - מחזיר boolean
const existsByFields = async (table, fieldMap) => {
  const conditions = Object.keys(fieldMap).map(k => `${k} = ?`).join(' AND ');
  const [rows] = await db.query(`SELECT id FROM ${table} WHERE ${conditions}`, Object.values(fieldMap));
  return rows.length > 0;
};

// עדכון שורה לפי שדה שאינו id (לדוגמה: WHERE userId = ?)
const updateByField = async (table, columns, values, whereField, whereValue) => {
  const setClause = columns.map(c => `${c} = ?`).join(', ');
  await db.query(`UPDATE ${table} SET ${setClause} WHERE ${whereField} = ?`, [...values, whereValue]);
};

module.exports = { selectAll, selectById, selectByField, selectPaged, insertRow, updateRow, deleteRow, insertRowAutoId, existsByFields, updateByField };
