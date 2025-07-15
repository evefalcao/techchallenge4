import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
// Update the import path below if the actual location is different
import { useAuth } from '../../../core/auth/context';
import { getPostById } from '../../../core/posts/api';

export default function PostDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { session: token } = useAuth();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id || !token) return;

        const fetchPost = async () => {
            try {
                const data = await getPostById(id, token);
                setPost(data);
            } catch (e: any) {
                setError(e.message || 'Erro ao carregar o post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, token]);

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