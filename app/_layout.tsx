import { AuthProvider, useAuth } from '@/core/auth/context';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

const InitialLayout = () => {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Wait for the session to load before making any routing decisions.
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (session && inAuthGroup) {
      // User is signed in but is in the auth group (e.g., on login screen).
      // Redirect to the main app.
      router.replace('/(tabs)');
    } else if (!session && !inAuthGroup) {
      // User is not signed in and is not in the auth group.
      // Redirect to the login screen.
      router.replace('/login');
    }
  }, [session, isLoading, segments, router]);

  if (isLoading) {
    // You can render a loading indicator or splash screen here.
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}