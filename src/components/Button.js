import React from "react";
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator, View } from "react-native";
import Color from "../utils/Colors";


const Button = (props) => {
    const { title = 'Enter', style = {}, textStyle = {}, onPress, isLoading } = props;

    const loader = () => {
        return (
            <ActivityIndicator animating={isLoading} />
        )
    }

    const button = () => {
        return (
            <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
                <Text style={[styles.text, textStyle]}>{title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.button, style]}>
            {isLoading ? loader() : button()}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        height: 50,
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: Color.uaStudiosGreen,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,

        shadowColor: Color.uaStudiosGreen,
        shadowOpacity: 0.4,
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 20,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
})

export default Button;
