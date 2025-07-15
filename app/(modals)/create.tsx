import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../core/auth/context';
import { createPost } from '../../core/posts/api';

export default function CreatePost() {
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [autor, setAutor] = useState('');
    const [loading, setLoading] = useState(false);

    const { session: token, user } = useAuth();
    const isTeacher = user?.role === 'teacher';
    const router = useRouter();

    if (!isTeacher) {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Você não tem permissão para criar posts.</Text>
            </View>
        );
    }

    const handleSubmit = async () => {
        if (!titulo.trim() || !conteudo.trim() || !autor.trim()) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        if (!token) {
            Alert.alert('Erro', 'Token de autenticação ausente');
            return;
        }

        setLoading(true);

        try {
            await createPost({ titulo, conteudo, autor }, token);
            Alert.alert('Sucesso', 'Post criado com sucesso!');
            router.back(); // ou router.replace('/tabs') se quiser voltar para a lista
        } catch (e: any) {
            Alert.alert('Erro', e.message || 'Erro ao criar o post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Título:</Text>
            <TextInput
                style={styles.input}
                value={titulo}
                onChangeText={setTitulo}
                placeholder="Digite o título"
            />
            <Text style={styles.label}>Conteúdo:</Text>
            <TextInput
                style={[styles.input, styles.textarea]}
                value={conteudo}
                onChangeText={setConteudo}
                placeholder="Digite o conteúdo"
                multiline
            />
            <Text style={styles.label}>Autor:</Text>
            <TextInput
                style={styles.input}
                value={autor}
                onChangeText={setAutor}
                placeholder="Digite o autor"
            />
            <Button title={loading ? 'Salvando...' : 'Criar Post'} onPress={handleSubmit} disabled={loading} />
        </View>
    );
}

const styles = StyleSheet.create({
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