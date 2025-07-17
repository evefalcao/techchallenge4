import HeaderLogin from '@/components/HeaderLogin';
import { useAuth } from '@/core/auth/context';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Ajuste o caminho para sua imagem de background
const backgroundImage = require('@/assets/images/BG.png');

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('@/assets/fonts/Inter-VariableFont.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signIn({ email, password });
    } catch (e: any) {
      setError(e.message || 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <SafeAreaView>
        <HeaderLogin
          titleImage={require('@/assets/images/LOGO.png')}
        />
      </SafeAreaView>

      <View style={styles.container}>
        <Text style={styles.title}>Bem Vindo!!</Text>
        <Text style={styles.subtitle}>Faça o login para continuar</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#30437D',
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#30437D',
    fontFamily: 'Inter-Regular',
  },
  input: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#28A745',
    padding: 12,
    borderRadius: 32,
    width: '80%',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
