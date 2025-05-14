import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Header = ({ title, onBackPress, showBack = false }) => {
    return (
        <View style={styles.container}>
            {
                showBack &&
                <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                    <Image style={{ width: 20, height: 20 }} source={{ uri: "https://cdn-icons-png.flaticon.com/128/130/130882.png" }} />
                </TouchableOpacity>
            }
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    backButton: {
        marginRight: 12,
        paddingVertical: 4
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000',
    },
});
