

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';

export interface HeaderProps {
    titleImage: any;
    showBack?: boolean;
}

export default function Header({
    titleImage,
    showBack = true,
}: HeaderProps) {
    const router = useRouter();

    return (
        <SafeAreaView>
            <View style={styles.wrapper}>
                {showBack && (
                    <View style={styles.backIconWrapper}>
                        <Ionicons
                            name="arrow-back"
                            size={30}
                            color="#30437D"
                            onPress={() => router.back()}
                        />
                    </View>
                )}
                <View style={styles.logoWrapper}>
                    <Image source={titleImage} style={styles.titleImage} resizeMode="contain" />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'transparent',
        paddingTop: 50,
        paddingBottom: 10,
        height: 120,
    },
    backIconWrapper: {
        position: 'absolute',
        top: 10,
        left: 16,
        zIndex: 1,
    },
    logoWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    titleImage: {
        width: '70%',
    },
});