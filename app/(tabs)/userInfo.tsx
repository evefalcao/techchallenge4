import HeaderPosts from '@/components/HeaderPosts';
import RoundedButton from '@/components/RoundedButton';
import { useAuth } from '@/core/auth/context';
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
const backgroundImage = require('@/assets/images/BG.png');

export default function Admin() {
    const { signOut, user } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            'Sair',
            'Deseja realmente sair?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sair', style: 'destructive', onPress: signOut },
            ]
        );
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
            <HeaderPosts
                titleImage={require('@/assets/images/LOGO.png')}
            />
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollWrapper}
                    contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                >
                    <Text style={styles.title}>Área do Usuário</Text>
                    <Text style={styles.author}>Email: {user?.email}</Text>
                    <Text style={styles.author}>Perfil: {user?.role}</Text>
                </ScrollView>
                <View style={styles.buttonWrapper}>
                    <RoundedButton title="Logout" onPress={handleLogout} backgroundColor="#d00" />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
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
    scrollWrapper: {
        flex: 1,
        width: '100%',
    },
    buttonWrapper: {
        width: '100%',
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    author: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#666',
        fontFamily: 'Inter-Regular',
        marginBottom: 5,
    },
});