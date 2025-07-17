import { useAuth } from '@/core/auth/context';
import { Ionicons } from '@expo/vector-icons';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Admin() {
  const { signOut, user } = useAuth();


  if (user?.role !== 'teacher') {
    return (
      <View style={styles.view}>
        <Ionicons name="warning" size={48} color="orange" style={styles.icon} />
        <Text style={styles.error}>
          Acesso negado. Apenas professores podem acessar essa tela.
        </Text>
      </View>
    );
  }

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
  error: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#721c24',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  icon: {
    marginBottom: 10,
  },
});