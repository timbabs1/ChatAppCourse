import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import SignInScreen from "../screens/SignInScreen";
import GroupScreen from "../screens/GroupsScreen";
import AddGroupScreen from "../screens/AddGroupScreen";
import ChatScreen from "../screens/ChatScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createStackNavigator();

const ChatFlow = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator name={"chat"}>
                <Stack.Screen name={"SplashScreen"} component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name={"SignInScreen"} component={SignInScreen} options={{ headerShown: false }} />
                <Stack.Screen name={"GroupScreen"} component={GroupScreen} options={{ title: "Groups" }} />
                <Stack.Screen name={"AddGroupScreen"} component={AddGroupScreen} options={{ title: "Add Group" }} />
                <Stack.Screen name={"ChatScreen"} component={ChatScreen} options={{ title: "Chats" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const MainStackNavigator = () => {
    return (
       ChatFlow()
    )
}

export default MainStackNavigator;
