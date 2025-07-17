import Header from '@/components/Header';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import RoundedButton from '../../components/RoundedButton';
import { useAuth } from '../../core/auth/context';
import { createUser } from '../../core/users/api';


export default function CreateUser() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'teacher' | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const roleRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    const { session: token } = useAuth();
    const router = useRouter();

    const handleSubmit = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        if (!token) {
            Alert.alert('Erro', 'Token de autenticação ausente');
            return;
        }

        setLoading(true);

        try {
            await createUser({ email, password, role }, token);
            Alert.alert('Sucesso', 'Usuário criado com sucesso!');
            router.back();
        } catch (e: any) {
            Alert.alert('Erro', e.message || 'Erro ao criar o usuário');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 20}
        >

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <Header
                    titleImage={require('@/assets/images/LOGO.png')}
                    showBack
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    ref={emailRef}
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoComplete="email"
                    textContentType="emailAddress"
                    autoCorrect={false}
                    keyboardType="email-address"
                />
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    ref={passwordRef}
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Text style={styles.label}>Função</Text>
                <TextInput
                    ref={roleRef}
                    style={styles.input}
                    placeholder="Função (student ou teacher)"
                    value={role}
                    onChangeText={(text) => setRole(text as 'student' | 'teacher')}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                />
                <RoundedButton
                    title={loading ? 'Salvando...' : 'Criar Usuário'}
                    onPress={handleSubmit}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        fontFamily: 'Inter-Regular',

    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 8,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#000',
        fontFamily: 'Inter-Regular',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        color: '#30437D',
        fontFamily: 'Inter-Bold',
        width: '100%',
    },

});