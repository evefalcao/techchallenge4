import AdminCrud from '@/components/AdminCrud';
import RoundedButton from '@/components/RoundedButton';
import { useAuth } from '@/core/auth/context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Admin() {
  const { user } = useAuth();
  const router = useRouter();


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
      <RoundedButton title="Criar novo Usuario" onPress={() => router.push('/createUser')} />
      <AdminCrud />

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