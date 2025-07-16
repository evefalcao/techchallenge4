

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
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'transparent',
        paddingTop: 50,
        paddingBottom: 10,
        height: 120,
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