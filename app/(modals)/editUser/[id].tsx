import Header from '@/components/Header';
import RoundedButton from '@/components/RoundedButton';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../../core/auth/context';
import { getUserById, updateUser } from '../../../core/users/api';


export default function EditPost() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { session: token, user } = useAuth();
    const isTeacher = user?.role === 'teacher';
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<'student' | 'teacher' | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const emailRef = useRef<TextInput>(null);

    useEffect(() => {
        if (!id || !token) return;

        const fetchUser = async () => {
            try {
                const user = await getUserById(id, token);
                setEmail(user.email);
                setRole(user.role);
            } catch (e: any) {
                Alert.alert('Erro', e.message || 'Erro ao carregar o usuário');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id, token]);

    const handleUpdate = async () => {
        if (!token || !id) return;

        try {
            await updateUser(id, { email, role: role as 'student' | 'teacher' }, token);
            router.back();
        } catch (e: any) {
            Alert.alert('Erro', e.message || 'Erro ao atualizar o usuário');
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('@/assets/images/BG.png')}
            style={{ flex: 1 }}
            resizeMode="cover"
        >

            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 120}
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                    >

                        <View style={styles.container}>
                            <Header
                                titleImage={require('@/assets/images/LOGO.png')}
                                showBack
                            />
                            {isTeacher && (
                                <RoundedButton
                                    title="Salvar"
                                    onPress={handleUpdate}
                                    backgroundColor="green"
                                    textColor="white"
                                />
                            )}
                            <Text style={styles.label}>Email:</Text>
                            <TextInput
                                ref={emailRef}
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Digite o email"
                                returnKeyType="next"

                            />
                            <Text style={styles.label}>Role:</Text>
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
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 16,
        paddingBottom: 150,
        width: '100%',
    },
    label: {
        fontSize: 16,
        color: '#30437D',
        marginBottom: 4,
        fontFamily: 'Inter-Bold',
    },
    input: {
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        fontFamily: 'Inter-Regular',
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
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
});