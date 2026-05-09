// Context גלובלי לניהול הזדהות - מאפשר לכל רכיב לדעת מי המשתמש המחובר
import { createContext, useContext, useState } from 'react';
import useUsers from '../hooks/useUsers';

const AuthContext = createContext(); // יצירת ה-Context

const BASE_URL = 'http://localhost:3001'; // כתובת השרת

// ספק ה-Context - עוטף את כל האפליקציה ומספק את נתוני המשתמש לכולם
export const AuthProvider = ({ children }) => {

  // אתחול עצלן - קורא מ-localStorage פעם אחת בטעינה, לא בכל render
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading] = useState(false);
  const { createUser } = useUsers(); // לשימוש בהרשמה

  // כניסה - שולח username+password לשרת ושומר את המשתמש ב-state וב-localStorage
  const login = async (username, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) throw new Error('Incorrect username or password');
    const foundUser = await response.json();
    setUser(foundUser);
    localStorage.setItem('user', JSON.stringify(foundUser)); // שמירה לריענון דפדפן
    return true;
  };

  // יציאה - מנקה את המשתמש מהזיכרון ומ-localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // הרשמה - יוצר משתמש חדש דרך השרת ומחבר אותו מיד
  const register = async (userData) => {
    const savedUser = await createUser(userData);
    setUser(savedUser);
    localStorage.setItem('user', JSON.stringify(savedUser));
    return true;
  };

  // עדכון פרטי המשתמש (לאחר עריכת פרופיל) - מסנכרן state ו-localStorage
  const updateUserData = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // הערכים שיהיו זמינים לכל רכיב שמשתמש ב-useAuth()
  const value = {
    user,
    login, logout, register, updateUserData,
    isAuthenticated: !!user, // המרת המשתמש ל-boolean
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children} {/* כל האפליקציה עטופה כאן */}
    </AuthContext.Provider>
  );
};

// hook נוח לשימוש ב-Context - במקום לכתוב useContext(AuthContext) בכל מקום
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be inside an AuthProvider');
  return context;
};
