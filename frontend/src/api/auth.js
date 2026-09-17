import apiFetch from './client';

export const login = async ({ username, password }) => {
  return apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
};

export const register = async ({ username, password, fullName, email }) => {
  return apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, fullName, email }),
  });
};

export const logout = () => {
  window.localStorage.removeItem('govai_token');
};
