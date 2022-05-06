import React from "react";
import { TextInput, Text, StyleSheet, View, Button} from "react-native";
import Color from '../utils/Colors';
import Constants from "../Constants/Constants";
import ButtonWithBackground from "./ButtonWithBackground";
import Strings from "../Constants/Strings";


const MessageFieldView = ( {term, placeHolder, onTermChange, onValidateTextField, error, onSubmit, isJoined }) => {
    return (
        <View style={styles.containerView}>
            <View style={styles.fieldView}>
                <TextInput
                    autoCorrect={false}
                    style={styles.textField}
                    placeholder={placeHolder}
                    value={term}
                    onChangeText={onTermChange}
                    onEndEditing={onValidateTextField}
                />
                <Button style={styles.buttonStyle} title={Strings.Send} color={Color.theme} onPress={onSubmit}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    containerView: {
        backgroundColor: Color.white,
        width: Constants.screenWidth,
        flex: 1,
        justifyContent: 'space-between',
    },
    fieldView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Color.white,
    },
    textField: {
        fontSize: 14,
        flex: 1,
        marginRight: 10,
        paddingLeft: 10,
        width: '75%',
        borderColor: Color.gray,
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: Color.smoke,
    },
    buttonStyle: {
        backgroundColor: Color.uaStudiosGreen,
        flex: 1,
        alignSelf: 'center',
        width: '25%',
        height: '100%',
    }
})

export default MessageFieldView;
