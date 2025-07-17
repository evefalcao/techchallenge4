import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
// Update the import path below if the actual location is different
import Header from '@/components/Header';
import RoundedButton from '@/components/RoundedButton';
import { useAuth } from '../../../core/auth/context';
import { deleteUser, getUserById } from '../../../core/users/api';
const backgroundImage = require('@/assets/images/BG.png');

export default function PostDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { session: token } = useAuth();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!token) {
            Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
            return;
        }

        Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir este usuário?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await deleteUser(id, token);
                        router.back(); // ou router.replace('/alguma-rota') se preferir
                    } catch (e: any) {
                        Alert.alert('Erro', e.message || 'Erro ao excluir o Usuário.');
                    }
                },
            },
        ]);
    };

    useFocusEffect(
        useCallback(() => {
            if (!id || !token) return;

            const fetchUser = async () => {
                try {
                    const data = await getUserById(id, token);
                    setUser(data);
                    setError(null);
                } catch (e: any) {
                    setError(e.message || 'Erro ao carregar o usuário');
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
        }, [id, token])
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !user) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error || 'Usuário não encontrado.'}</Text>
            </View>
        );
    }

    return (
        <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">

            <View style={styles.container}>
                <Header
                    titleImage={require('@/assets/images/LOGO.png')}
                    showBack
                />
                <ScrollView
                    style={styles.scrollWrapper}
                    contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                >
                    <Text style={styles.title}>Detalhes do Usuário</Text>
                    <Text style={styles.content}>Email: {user.email}</Text>
                    <Text style={styles.content}>Role: {user.role}</Text>

                </ScrollView>


                <View style={styles.buttonWrapper}>
                    <RoundedButton title="Excluir" onPress={handleDelete} backgroundColor="#d00" />
                    <RoundedButton title="Editar" onPress={() => router.push(`/editUser/${id}`)} />
                </View>

            </View>
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
        justifyContent: 'space-between',
        width: '100%',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#30437D',
        fontFamily: 'Inter-Bold',
    },
    content: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Inter-Regular',
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        lineHeight: 24,
    },
    scrollWrapper: {
        flex: 1,
        width: '100%',
    },
    scrollContent: {
        width: '100%',
        marginBottom: 25,
    },
    buttonWrapper: {
        width: '100%',
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    author: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#666',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});

export const options = {
    headerShown: false,
};