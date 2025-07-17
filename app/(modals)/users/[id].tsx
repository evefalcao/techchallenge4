

import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Button,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';
import Header from '../../../components/Header';
import { useUsers } from '../../../core/users/useUsers';

export default function EditUser() {
    const { id } = useLocalSearchParams();
    const { users, updateUser, refetch } = useUsers();
    const router = useRouter();

    const user = users.find((u) => u._id === id);

    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user]);

    const handleUpdate = async () => {
        if (!id || typeof id !== 'string') return;
        await updateUser(id, { email, role });
        await refetch();
        router.back();
    };

    return (
        <ImageBackground
            source={require('@/assets/images/BG.png')}
            style={{ flex: 1 }}
            resizeMode="cover"
        >

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Header
                        titleImage={require('@/assets/images/LOGO.png')}
                        showBack
                    />
                    <Text style={styles.title}>Editar Usuário</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Role (student ou teacher)"
                        value={role}
                        onChangeText={setRole}
                    />
                    <Button title="Salvar alterações" onPress={handleUpdate} />
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        gap: 12,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#30437D',
        fontFamily: 'Inter-Bold',
    },
    input: {
        height: 48,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 12,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#fff',
        fontFamily: 'Inter-Regular',
    },
});