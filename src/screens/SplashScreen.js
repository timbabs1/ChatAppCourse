import React, {useEffect} from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Color from "../utils/Colors";
import Images from "../Constants/Images";
import Constants from "../Constants/Constants";
import firebase from "../firebase/Firebase";
import LottieView from "lottie-react-native";

const SplashScreen = ({navigation}) => {
  useEffect(() => {
      NavigateToAuthORGroupScreen();
  }, [navigation]);

    const NavigateToAuthORGroupScreen = () => {

      setTimeout(() => {
          firebase.auth().onAuthStateChanged((user) => {
              console.log("user state has changed", user);
              if (user !== null) {
                  console.log("user is signed in: splash screen", user);
                  navigation.reset({
                      index: 0,
                      routes: [{ name: "GroupScreen" }],
                  });
              } else {
                  console.log("user is signed out: splash screen", user);
                  navigation.reset({
                      index: 0,
                      routes: [{ name: "SignInScreen" }],
                  })
              }
          });
      }, 1500);
    }

    return (
        <View style={styles.container}>
            <Image source={Images.logo} style={styles.logo} />
            <View style={styles.lottieView}>
                <LottieView source={require("../../assets/waiting.json")} autoPlay loop></LottieView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    lottieView: {
        width: "100%",
        height: 0.6 * Constants.screenHeight,
    },
    logo: {
        alignSelf: 'center',
        margin: 0.04 * Constants.screenHeight,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.theme,
    }
});

export default SplashScreen;
