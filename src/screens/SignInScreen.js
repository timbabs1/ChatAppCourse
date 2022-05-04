import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, KeyboardAvoidingView, Alert } from "react-native";
import Button from "../components/Button";
import Strings from '../Constants/Strings';
import Colors from "../utils/Colors";
import Images from "../Constants/Images";
import Constants from "../Constants/Constants";
import DismissKeyboard from "../components/DismissKeyboard";
import Utility from "../utils/Utility";
import firebase from "../firebase/Firebase";



import EmailTextField from "../components/EmailTextField";
import PasswordTextField from "../components/PasswordTextField";

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateEmailAddress = () => {
        const isValidEmail = Utility.isEmailValid(email);
        isValidEmail ? setEmailError('') : setEmailError(Strings.InvalidEmailAddress)
        return isValidEmail
    };

    const validatePasswordField = () => {
        const isValidField = Utility.isValidField(password);
        isValidField ? setPasswordError('') : setPasswordError(Strings.PasswordFieldEmpty);
        return isValidField
    }

    const registration = (email, password) => {
        try {
            setIsLoading(true);
            firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
                setIsLoading(false);
                // navigation.navigate('GroupScreen');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'GroupScreen' }],
                });
                Alert.alert('Logged In');

            }).catch(error => {
                setIsLoading(false);
                firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
                    setIsLoading(false);
                    Alert.alert('Registered and created new user');
                    // navigation.navigate('GroupScreen');
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Groups Screen' }],
                    });
                }).catch(error => {
                    console.log("error", error.message)
                    setIsLoading(false);
                    Alert.alert(error.message);
                });
            })
        } catch (error) {
            console.log(error)
            Alert.alert(error.message);
        }
    }

    const performAuth = () => {
        const isValidEmail = validateEmailAddress();
        const isValidPassword = validatePasswordField();

        if (isValidEmail && isValidPassword) {
            setEmail('');
            setPassword('');
            registration(email, password);
        }
    }
  return (
      <DismissKeyboard>
          <KeyboardAvoidingView style={styles.container} behavior={"padding"} enabled>
              <View>
                  <SafeAreaView>
                      <Image style={styles.logo} source={Images.logo}></Image>
                      <EmailTextField
                      term={email}
                      error={emailError}
                      placeHolder={Strings.EmailPlaceHolder}
                      onTermChange={(newEmail) => setEmail(newEmail)}
                      onValidateEmailAddress={validateEmailAddress}
                      />

                      <PasswordTextField
                      term={password}
                      error={passwordError}
                      placeHolder={Strings.PasswordPlaceHolder}
                      onTermChange={(newPassword) => setPassword(newPassword)}
                      onValidatePasswordField={validatePasswordField}
                      />

                      <Button title={Strings.Join} onPress={performAuth} isLoading={isLoading} />
                  </SafeAreaView>
              </View>
          </KeyboardAvoidingView>
      </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        alignSelf: 'center',
        margin: 0.04 * Constants.screenHeight,
        height: 100,
        marginBottom: 20,
    },
    text: {
        fontSize: 24,
        color: '#101010',
        fontWeight: 'bold',
    },
})

export default SignInScreen;
