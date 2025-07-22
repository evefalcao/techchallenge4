import AdminCrud from '@/components/AdminCrud';
import HeaderPosts from '@/components/HeaderPosts';
import RoundedButton from '@/components/RoundedButton';
import { useAuth } from '@/core/auth/context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function Admin() {
  const { user } = useAuth();
  const router = useRouter();
  const backgroundImage = require('@/assets/images/BG.png');


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
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <HeaderPosts
        titleImage={require('@/assets/images/LOGO.png')}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Lista de Usuários</Text>
        <RoundedButton title="Criar Usuário" onPress={() => router.push('/createUser')} />
        <AdminCrud />

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#30437D',
  },
});