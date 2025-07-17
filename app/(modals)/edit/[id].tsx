import Header from '@/components/Header';
import RoundedButton from '@/components/RoundedButton';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
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

    const tituloRef = useRef<TextInput>(null);
    const conteudoRef = useRef<TextInput>(null);

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
        <ImageBackground
            source={require('@/assets/images/BG.png')}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <Header
                titleImage={require('@/assets/images/LOGO.png')}
                showBack
            />
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
                            {isTeacher && (
                                <RoundedButton
                                    title="Salvar"
                                    onPress={handleUpdate}
                                    backgroundColor="green"
                                    textColor="white"
                                />
                            )}
                            <Text style={styles.label}>Título:</Text>
                            <TextInput
                                ref={tituloRef}
                                style={styles.input}
                                value={titulo}
                                onChangeText={setTitulo}
                                placeholder="Digite o título"
                                returnKeyType="next"
                                onSubmitEditing={() => conteudoRef.current?.focus()}
                            />
                            <Text style={styles.label}>Conteúdo:</Text>
                            <TextInput
                                ref={conteudoRef}
                                style={[styles.input, styles.textarea]}
                                value={conteudo}
                                onChangeText={setConteudo}
                                placeholder="Digite o conteúdo"
                                multiline
                                scrollEnabled
                                returnKeyType="done"
                            />

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
    textarea: {
        minHeight: 120,
        textAlignVertical: 'top',
        lineHeight: 24,
    },
});