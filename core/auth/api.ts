import Constants from 'expo-constants';
import { getSession } from '../auth/session-storage';

// Get the API URL from the environment variables.
const API_URL = Constants.expoConfig?.extra?.apiUrl;
console.log(API_URL);
// Ensure the API URL is defined.
if (!API_URL) {
  throw new Error('API_URL is not defined in your app config. Please check your .env and app.config.js files.');
}

export async function loginApi(data: { email: string; password: string }): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Try to parse a specific error message from the response body
      const errorData = await response.json().catch(() => ({ message: 'Invalid credentials' }));
      throw new Error(errorData.message || 'Invalid username or password');
    }

    const responseData = await response.json();

    if (!responseData.token) {
      throw new Error('Login failed: No token received from server.');
    }

    return responseData.token;
  } catch (error: any) {
    // Re-throw the error so it can be caught by the calling function in the UI
    throw new Error(error.message || 'An unknown error occurred during login.');
  }
}

export async function getPostById(id: string): Promise<any> {
  const token = await getSession();

  const response = await fetch(`${API_URL}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar o post' }));
    throw new Error(errorData.message || 'Erro ao buscar o post');
  }

  return response.json();
}