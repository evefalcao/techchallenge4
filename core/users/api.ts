import Constants from 'expo-constants';
import { User } from './types';

const API_URL = Constants.expoConfig?.extra?.apiUrl;

if (!API_URL) {
  throw new Error('API_URL is not defined in your app config.');
}

export async function getUsers(token: string): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to fetch users' }));
      throw new Error(errorData.message || 'Failed to fetch users');
    }

    return response.json();
  } catch (error: any) {
    throw new Error(error.message || 'An unknown error occurred while fetching users.');
  }
}

export async function getUserById(id: string, token: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to fetch user' }));
      throw new Error(errorData.message || 'Failed to fetch user');
    }

    return response.json();
  } catch (error: any) {
    throw new Error(error.message || 'An unknown error occurred while fetching user.');
  }
}

export async function createUser(userData: Partial<User>, token: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to create user' }));
      throw new Error(errorData.message || 'Failed to create user');
    }

    return response.json();
  } catch (error: any) {
    throw new Error(error.message || 'An unknown error occurred while creating the user.');
  }
}

export async function updateUser(id: string, userData: Partial<User>, token: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to update user' }));
      throw new Error(errorData.message || 'Failed to update user');
    }

    return response.json();
  } catch (error: any) {
    throw new Error(error.message || 'An unknown error occurred while updating the user.');
  }
}

export async function deleteUser(id: string, token: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to delete user' }));
      throw new Error(errorData.message || 'Failed to delete user');
    }
  } catch (error: any) {
    throw new Error(error.message || 'An unknown error occurred while deleting the user.');
  }
}

export async function searchUsers(query: string, token: string): Promise<User[]> {
  const response = await fetch(`${API_URL}/users/search/${encodeURIComponent(query)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Nenhum usuário encontrado com essa pesquisa.');
  }
  return response.json();
}
