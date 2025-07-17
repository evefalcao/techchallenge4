import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';

export interface HeaderProps {
    /** Imagem do título (PNG, JPG etc). Usar require ou source object */
    titleImage: any;
    showBack?: boolean;
    onRightPress?: () => void;
    rightIconName?: keyof typeof Ionicons.glyphMap;
}

export default function HeaderLogin({
    titleImage,
}: HeaderProps) {

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
        marginTop: 150,
        paddingHorizontal: 10,

    },
    logoWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    titleImage: {
        width: '90%',
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
