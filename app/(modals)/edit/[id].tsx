import RoundedButton from '@/components/RoundedButton';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../../core/auth/context';
import { getPostById, updatePost } from '../../../core/posts/api';

export default function EditPost() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { session: token, user } = useAuth();
    const isTeacher = user?.role === 'teacher';
    const router = useRouter();
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id || !token) return;

        const fetchPost = async () => {
            try {
                const post = await getPostById(id, token);
                setTitulo(post.titulo);
                setConteudo(post.conteudo);
            } catch (e: any) {
                Alert.alert('Erro', e.message || 'Erro ao carregar o post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, token]);

    const handleUpdate = async () => {
        if (!token || !id) return;

        try {
            await updatePost(id, { titulo, conteudo }, token);
            router.back();
        } catch (e: any) {
            Alert.alert('Erro', e.message || 'Erro ao atualizar o post');
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
        <View style={styles.container}>
            <Text style={styles.label}>Título:</Text>
            <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />
            <Text style={styles.label}>Conteúdo:</Text>
            <TextInput
                style={[styles.input, styles.textarea]}
                value={conteudo}
                onChangeText={setConteudo}
                multiline
            />
            {isTeacher && (
                <RoundedButton title="Salvar" onPress={handleUpdate} backgroundColor='green' />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 8,
        marginBottom: 12,
    },
    textarea: {
        height: 100,
        textAlignVertical: 'top',
    },
});