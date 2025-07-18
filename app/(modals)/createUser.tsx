import Header from '@/components/Header';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import RoundedButton from '../../components/RoundedButton';
import { useAuth } from '../../core/auth/context';
import { createUser } from '../../core/users/api';


export default function CreateUser() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'teacher' | undefined>(undefined);
    const [loading, setLoading] = useState(false);

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
        <ImageBackground
            source={require('@/assets/images/BG.png')}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 20}
            >
                <Header
                    titleImage={require('@/assets/images/LOGO.png')}
                    showBack
                />
                <Text style={styles.title}>Criar Usuário</Text>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    style={styles.wrapper}
                >
                    <View style={styles.inputsWrapper}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            ref={emailRef}
                            style={styles.input}
                            placeholder="Digite o Email"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            autoComplete="email"
                            textContentType="emailAddress"
                            autoCorrect={false}
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordRef.current?.focus()}
                        />
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            ref={passwordRef}
                            style={styles.input}
                            placeholder="Digite a Senha"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            returnKeyType="done"
                        />
                    </View>

                    <Text style={styles.label}>Função</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={role}
                            onValueChange={(itemValue: 'student' | 'teacher') => setRole(itemValue)}
                            style={styles.picker}
                            dropdownIconColor="#30437D"
                        >
                            <Picker.Item label="Selecione a função" value={undefined} />
                            <Picker.Item label="Aluno" value="student" />
                            <Picker.Item label="Professor" value="teacher" />
                        </Picker>
                    </View>

                    <RoundedButton
                        title={loading ? 'Salvando...' : 'Criar Usuário'}
                        onPress={handleSubmit}
                        backgroundColor="#4CAF50"
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        fontFamily: 'Inter-Regular',
        justifyContent: 'center',

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
        // Para o Picker funcionar bem, remova a cor do texto (color) e padding extra pode ser ajustado se necessário
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        color: '#30437D',
        fontFamily: 'Inter-Bold',
        width: '100%',
    },

    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        backgroundColor: '#fff',
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 2,
        height: 70,
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    picker: {
        color: '#000',
        fontFamily: 'Inter-Regular',
        fontSize: 16,
    },
    wrapper: {
        flex: 1,
        padding: 20,
        marginTop: 20,

    },
    inputsWrapper: {
        width: '100%',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        color: '#30437D',
        textAlign: 'center',
        fontFamily: 'Inter-Bold',
    },

});