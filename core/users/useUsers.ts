import { useAuth } from '@/core/auth/context';
import { useCallback, useEffect, useState } from 'react';
import { getUsers } from './api';
import { User } from './types';

export function useUsers() {
  const { session } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllUsers = useCallback(async () => {
    if (!session) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const fetchedUsers = await getUsers(session);
      setUsers(fetchedUsers);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return { users, isLoading, error, refetch: fetchAllUsers };
}
