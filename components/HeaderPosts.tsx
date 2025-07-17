import React from 'react';
import {
    Image,
    StyleSheet,
    View
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
        </View >
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'transparent',
        paddingTop: 20,
        paddingBottom: 10,
        height: 50,
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