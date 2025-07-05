import { useAuth } from '@/core/auth/context';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Admin() {
  const { signOut } = useAuth();
  return (
    <View style={styles.view}>
      <Text>Admin Screen</Text>
      <Button title="Logout" onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});