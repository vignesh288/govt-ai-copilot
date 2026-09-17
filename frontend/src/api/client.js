const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const getAuthToken = () => window.localStorage.getItem('govai_token');

const defaultHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  const contentType = response.headers.get('Content-Type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = payload?.message || payload?.error || response.statusText || 'Request failed';
    throw new Error(error);
  }

  return payload;
};

export const apiFetch = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { ...defaultHeaders(), ...(options.headers || {}) },
    credentials: 'include',
    ...options,
  });
  return handleResponse(response);
};

export default apiFetch;
