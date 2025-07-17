import { useUsers } from '@/core/users/useUsers';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function AdminCrud() {
    const { users, isLoading, error } = useUsers();

    if (isLoading) {
        return (
            <View style={styles.center}>
                <Text style={styles.loading}>Loading users...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>Failed to load users: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.email}>{item.email}</Text>
                        <Text style={styles.role}>{item.role}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>No users found.</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f2f2f2',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        fontSize: 16,
        color: '#666',
    },
    error: {
        fontSize: 16,
        color: 'red',
    },
    empty: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
    card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    email: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    role: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
});