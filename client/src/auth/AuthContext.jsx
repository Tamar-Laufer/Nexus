import { createContext, useContext, useState } from 'react';
import useUsers from '../hooks/useUsers';
import useLocalStorage from '../hooks/useLocalStorage';
import useApi from '../hooks/useApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const { createUser } = useUsers();
  const { apiCall, execute, loading } = useApi();

  const login = async (username, password) => {
    const result = await execute(() =>
      apiCall('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      })
    );
    if (!result?.user || !result?.token) {
      throw new Error('Login failed. Please try again.');
    }
    setUser(result.user);
    localStorage.setItem('token', result.token);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const register = async (userData) => {
    const result = await createUser(userData);
    if (!result?.user || !result?.token) {
      throw new Error('Registration failed. Please try again.');
    }
    setUser(result.user);
    localStorage.setItem('token', result.token);
    return true;
  };

  const updateUserData = (updatedUser) => {
    setUser(updatedUser);
  };

  const value = {
    user,
    login, logout, register, updateUserData,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be inside an AuthProvider');
  return context;
};
