import Header from '@/components/Header';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import RoundedButton from '../../components/RoundedButton';
import { useAuth } from '../../core/auth/context';
import { createPost } from '../../core/posts/api';

export default function CreatePost() {
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [autor, setAutor] = useState('');
    const [loading, setLoading] = useState(false);

    const tituloRef = useRef<TextInput>(null);
    const conteudoRef = useRef<TextInput>(null);
    const autorRef = useRef<TextInput>(null);

    const { session: token, user } = useAuth();
    const isTeacher = user?.role === 'teacher';
    const router = useRouter();

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
            router.back();
        } catch (e: any) {
            Alert.alert('Erro', e.message || 'Erro ao criar o post');
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
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 20}
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
                            {!isTeacher ? (
                                <Text style={styles.label}>Você não tem permissão para criar posts.</Text>
                            ) : (
                                <>

                                    <RoundedButton
                                        title={loading ? 'Salvando...' : 'Criar Post'}
                                        onPress={handleSubmit}
                                    />

                                    <Text style={styles.label}>Título:</Text>
                                    <TextInput
                                        ref={tituloRef}
                                        style={styles.input}
                                        value={titulo}
                                        onChangeText={setTitulo}
                                        placeholder="Digite o título"
                                        returnKeyType="next"
                                        onSubmitEditing={() => autorRef.current?.focus()}
                                    />
                                    <Text style={styles.label}>Autor:</Text>
                                    <TextInput
                                        ref={autorRef}
                                        style={styles.input}
                                        value={autor}
                                        onChangeText={setAutor}
                                        placeholder="Digite o autor"
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

                                </>
                            )}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // backgroundColor: '#fff', // Removido para exibir o fundo da imagem
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        color: '#30437D',
        fontFamily: 'Inter-Bold',
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
    },
    textarea: {
        height: 'auto',
        minHeight: 100,
        maxHeight: 300,
        textAlignVertical: 'top',
    },
    buttonWrapper: {
        flex: 1,
        marginTop: 10,

    },
});