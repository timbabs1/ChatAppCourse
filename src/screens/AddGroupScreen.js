import React from 'react';
import { StyleSheet, View, Text } from "react-native";

const AddGroupScreen = () => {
    return (
        <View styles={styles.container}>
            <Text>AddGroupScreen</Text>
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

export default AddGroupScreen;
