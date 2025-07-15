import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
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
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>


                <Image source={titleImage} style={styles.titleImage} resizeMode="contain" />




            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#5395EA',
        height: 30
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingTop: 100,
        height: 100,
    },
    titleImage: {
        width: '90%',
    },

});
