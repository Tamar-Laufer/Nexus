// hook לפעולות על משתמשים - בשימוש בהרשמה, כניסה, ועריכת פרופיל
import useResource from './useResource';

const useUsers = () => {
  const { get, create, update } = useResource('/users');

  const fetchUsers        = ()           => get();           // GET /users - כל המשתמשים
  const fetchUser         = (id)         => get(`/${id}`);   // GET /users/:id - משתמש בודד
  const createUser        = (data)       => create(data);    // POST /users - הרשמה
  const updateUser        = (id, data)   => update(id, data);// PUT /users/:id - עדכון פרופיל

  // PUT /users/:id/credentials - עדכון שם משתמש/סיסמה (נתיב ייחודי)
  const updateCredentials = (id, data)   => update(id, data, '/credentials');

  return { fetchUsers, fetchUser, createUser, updateUser, updateCredentials };
};

export default useUsers;
