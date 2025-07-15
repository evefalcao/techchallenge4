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

export async function getPostById(id: string, token: string): Promise<Post> {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to fetch post' }));
      throw new Error(errorData.message || 'Failed to fetch post');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'An unknown error occurred while fetching post.');
  }
}
export async function updatePost(id: string, postData: Partial<Post>, token: string): Promise<Post> {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to update post' }));
      throw new Error(errorData.message || 'Failed to update post');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'An unknown error occurred while updating the post.');
  }
}

export async function deletePost(id: string, token: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to delete post' }));
      throw new Error(errorData.message || 'Failed to delete post');
    }
  } catch (error: any) {
    throw new Error(error.message || 'An unknown error occurred while deleting the post.');
  }
}

export async function createPost(postData: Partial<Post>, token: string): Promise<Post> {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to create post' }));
      throw new Error(errorData.message || 'Failed to create post');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'An unknown error occurred while creating the post.');
  }
}