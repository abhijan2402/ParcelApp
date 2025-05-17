import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar,
    Platform,
} from 'react-native';
import { COLOR } from '../Constants/Colors';
import { windowHeight } from '../Constants/Dimensions';

const Header = ({ title, onBackPress, showBack = false }) => {
    return (
        <View style={styles.safeHeader}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            <View style={styles.container}>
                {showBack && (
                    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/128/130/130882.png',
                            }}
                        />
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    safeHeader: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: COLOR.white,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        marginRight: 12,
        paddingVertical: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000',
    },
});
