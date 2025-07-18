import { searchUsers } from '@/core/users/api';
import { useUsers } from '@/core/users/useUsers';
import { Link, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../core/auth/context';

export default function AdminCrud() {
    const { token } = useAuth();
    const { users, isLoading, error, refetch } = useUsers();


    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    const handleSearch = async (text: string) => {
        setSearchQuery(text);
        if (text.length === 0) {
            setFilteredUsers(users);
            return;
        }
        try {
            const result = await searchUsers(text, token || '');
            setFilteredUsers(result);
        } catch {
            //console.error('Search failed:', err);
        }
    };

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Try Again" onPress={refetch} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={{
                    backgroundColor: '#fff',
                    marginHorizontal: 16,
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 16,
                    marginTop: 10,
                    fontFamily: 'Inter-Regular',
                    fontSize: 16,
                    color: '#333',
                    elevation: 3,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                }}
                placeholder="Buscar usuários..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredUsers}

                keyExtractor={(item, index) => item?._id?.toString() ?? index.toString()}
                renderItem={({ item }) => {
                    // Defensively check if the item is valid before rendering
                    if (!item) {
                        return null;
                    }
                    return (
                        <Link href={`/users/${item._id}`} asChild>
                            <TouchableOpacity style={styles.userContainer}>
                                <Text style={styles.role}>{item.role === 'teacher' ? 'Professor 👨‍🏫 ' : 'Aluno 👨‍🎓'}</Text>
                                <Text style={styles.email}>{item.email}</Text>

                            </TouchableOpacity>
                        </Link>
                    );
                }}
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text>No users found.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    userContainer: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        minHeight: 50,
        overflow: 'hidden',

    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    list: {
        gap: 12,
        paddingTop: 12,
    },
    item: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f1f1f1',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,

    },
    email: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 4,
    },
    role: {
        fontSize: 20,
        color: '#666',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});