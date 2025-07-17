import { useAuth } from '@/core/auth/context';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
        <View style={styles.view}>
            <Text style={styles.title}>Área Administrativa</Text>
            <Text style={styles.info}>Logado como: {user?.email}</Text>
            <Text style={styles.info}>Perfil: {user?.role}</Text>

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#30437D',
        marginBottom: 24,
    },
    info: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    button: {
        marginTop: 32,
        backgroundColor: '#E63946',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});