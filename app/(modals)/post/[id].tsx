import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
// Update the import path below if the actual location is different
import RoundedButton from '@/components/RoundedButton';
import { useAuth } from '../../../core/auth/context';
import { deletePost, getPostById } from '../../../core/posts/api';

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
        <View style={styles.container}>
            <Text style={styles.title}>{post.titulo}</Text>
            <Text style={styles.content}>{post.conteudo}</Text>
            <Text style={styles.author}>Autor: {post.autor}</Text>
            {isTeacher && (
                <>
                    <RoundedButton title="Excluir" onPress={handleDelete} backgroundColor="#d00" />
                    <RoundedButton title="Editar" onPress={() => router.push(`/edit/${id}`)} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    content: {
        fontSize: 16,
        marginBottom: 16,
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