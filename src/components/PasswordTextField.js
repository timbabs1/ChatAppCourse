import React from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";
import Constants from "../Constants/Constants";
import Colors from "../utils/Colors";

const PasswordTextField = ({term, placeHolder, onTermChange, onValidatePasswordField, error}) => {
    return (
        <View>
            <Text style={styles.ErrorText}>{error}</Text>
            <View style={styles.TextFieldView}>
                <TextInput
                    autoCorrect={false}
                    style={styles.TextField}
                    placeholder={placeHolder}
                    secureTextEntry={true}
                    onChangeText={onTermChange}
                    onEndEditing={onValidatePasswordField}
                    value={term}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    TextField: {
        fontSize: 14,
        flex: 1,
        marginHorizontal: 20,
    },
    TextFieldView: {
        height: Constants.screenHeight * 0.06,
        width: Constants.screenWidth * 0.8,
        borderRadius: 5,
        marginTop: 5,
        borderColor: Colors.black,
        justifyContent: 'center',
        backgroundColor: Colors.smoke,
    },
    ErrorText: {
        fontSize: 12,
        color: Colors.red,
        marginBottom: 5,
        marginHorizontal: 20,
    }
})

export default PasswordTextField;
