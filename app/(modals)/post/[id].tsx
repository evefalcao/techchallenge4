import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
// Update the import path below if the actual location is different
import Header from '@/components/Header';
import RoundedButton from '@/components/RoundedButton';
import { useAuth } from '../../../core/auth/context';
import { deletePost, getPostById } from '../../../core/posts/api';
const backgroundImage = require('@/assets/images/BG.png');

export default function PostDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { session: token, user } = useAuth();
    const isTeacher = user?.role === 'teacher';
    const router = useRouter();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!token) {
            Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
            return;
        }

        Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir este post?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await deletePost(id, token);
                        router.back(); // ou router.replace('/alguma-rota') se preferir
                    } catch (e: any) {
                        Alert.alert('Erro', e.message || 'Erro ao excluir o post.');
                    }
                },
            },
        ]);
    };

    useFocusEffect(
        useCallback(() => {
            if (!id || !token) return;

            const fetchPost = async () => {
                try {
                    const data = await getPostById(id, token);
                    setPost(data);
                    setError(null);
                } catch (e: any) {
                    setError(e.message || 'Erro ao carregar o post');
                } finally {
                    setLoading(false);
                }
            };

            fetchPost();
        }, [id, token])
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !post) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error || 'Post não encontrado.'}</Text>
            </View>
        );
    }

    return (
        <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
            <Header
                titleImage={require('@/assets/images/LOGO.png')}
                showBack
            />
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollWrapper}
                    contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                >
                    <Text style={styles.title}>{post.titulo}</Text>
                    <Text style={styles.author}>Autor: {post.autor}</Text>
                    <View style={styles.scrollContent}>
                        <Text style={styles.content}>{post.conteudo}</Text>
                    </View>
                </ScrollView>

                {isTeacher && (
                    <View style={styles.buttonWrapper}>
                        <RoundedButton title="Excluir" onPress={handleDelete} backgroundColor="#d00" />
                        <RoundedButton title="Editar" onPress={() => router.push(`/edit/${id}`)} />
                    </View>
                )}
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