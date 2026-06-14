import { useState } from 'react';

const BASE_URL = 'http://localhost:3001';

const clearSessionAndRedirect = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      let message = `Error: ${response.status}`;
      try {
        const data = await response.json();
        if (data.message) message = data.message;
      } catch {}

      // 401 from our auth middleware always has this exact message.
      // 401 from login/credentials endpoints has a different message — don't redirect those.
      const isMissingToken = response.status === 401 && message === 'Access token required';
      // 403 from our auth middleware always has this exact message.
      // 403 from business logic (e.g. "Not authorized" on someone else's post) must NOT redirect.
      const isInvalidToken = response.status === 403 && message === 'Invalid or expired token';

      if (isMissingToken || isInvalidToken) {
        clearSessionAndRedirect();
        throw new Error(message);
      }

      throw new Error(message);
    }

    return response.json();
  };

  const execute = async (apiFunction) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { apiCall, execute, loading, error };
};

export default useApi;
