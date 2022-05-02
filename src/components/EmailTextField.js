import React from "react";
import { TextInput, Text, StyleSheet, View} from "react-native";
import Colors from "../utils/Colors";
import Constants from "../Constants/Constants";

const EmailTextField = ({ term, placeHolder, onTermChange, onValidateEmailAddress, error}) => {

    return (
        <View>
            <Text style={styles.error}>{error}</Text>
            <View style={styles.TextFieldView}>
                <TextInput
                    autoCorrect={false}
                    style={styles.TextField}
                    placeholder={placeHolder}
                    value={term}
                    onChangeText={onTermChange}
                    onEndEditing={onValidateEmailAddress}
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
        width: Constants.screenWidth * 0.85,
        borderRadius:  10,
        marginTop: 5,
        marginBottom: 10,
        borderColor: Colors.black,
        borderWidth: 1,
        justifyContent: "center",
        backgroundColor: Colors.smoke,
    },
    error: {
        fontSize: 12,
        color: 'red',
        marginBottom: -5,
        marginHorizontal: 20,
    }
})

export default EmailTextField;
