import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ChatScreen from "./screens/ChatScreen";

let ws = new WebSocket("ws://192.168.29.91:8080");
let interval;

const Tab = createBottomTabNavigator();

export default function App() {
    global.ws = ws;
    global.interval = interval;

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Login">
                <Tab.Screen name="Login" component={LoginScreen} />
                <Tab.Screen name="Chat" component={ChatScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
