import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export interface HeaderPostsProps {
    titleImage: any;
}

export default function HeaderPosts({
    titleImage,
}: HeaderPostsProps) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.logoWrapper}>
                <Image source={titleImage} style={styles.titleImage} resizeMode="contain" />
            </View>
            <View>
                <Text style={styles.subtitle}>
                    Notícias, curiosidades, materiais e tudo relacionado à nossa escola!                </Text>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'transparent',
        paddingTop: 50,
        paddingBottom: 10,
        height: 130,
    },
    logoWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    titleImage: {
        width: '70%',
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 14,
        color: '#30437D',
        paddingHorizontal: 20,
        paddingTop: 20,
        marginTop: 8,
        fontFamily: 'inter-regular',
        lineHeight: 20,
        letterSpacing: 0.5,

    },
});