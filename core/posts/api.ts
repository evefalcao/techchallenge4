import Constants from 'expo-constants';
import { Post } from './types';

const API_URL = Constants.expoConfig?.extra?.apiUrl;

if (!API_URL) {
  throw new Error('API_URL is not defined in your app config.');
}

export async function getPosts(token: string): Promise<Post[]> {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to fetch posts' }));
      throw new Error(errorData.message || 'Failed to fetch posts');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'An unknown error occurred while fetching posts.');
  }
}