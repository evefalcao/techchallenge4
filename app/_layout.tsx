import { AuthProvider, useAuth } from '@/core/auth/context';
import {  Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

const InitialLayout = () => {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return; // Don't do anything until loading is false.
    }

    const inAuthGroup = segments[0] === '(auth)';

    if (session && !inAuthGroup) {
      // User is signed in and not in the main app area.
      // Redirect to the home screen.
      router.replace('/(tabs)');
    } else if (!session) {
      // User is not signed in.
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