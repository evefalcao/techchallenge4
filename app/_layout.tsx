import { Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{title: "Home"}} />
      <Tabs.Screen name="login" options={{title: "Login"}} />
    </Tabs>
  );
}