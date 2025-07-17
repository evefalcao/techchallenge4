import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface HeaderProps {
    titleImage: any;
    showBack?: boolean;
}

export default function Header({
    titleImage,
    showBack = true,
}: HeaderProps) {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView>
            <View style={[styles.wrapper, { paddingTop: insets.top + 10 }]}>
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
        paddingBottom: 10,
        height: 120,
    },
    backIconWrapper: {
        position: 'absolute',
        top: 20,
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