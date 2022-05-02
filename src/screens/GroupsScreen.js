import React from 'react';
import { StyleSheet, View, Text } from "react-native";

const GroupScreen = () => {
    return (
        <View styles={styles.container}>
            <Text>Group Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        color: '#101010',
        fontWeight: 'bold',
    },
});

export default GroupScreen;
