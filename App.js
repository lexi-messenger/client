// Fonts: https://github.com/JulietaUla/Montserrat/tree/master/fonts/ttf

import React from "react";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ChatScreen from "./screens/ChatScreen";

import config from "./config.js"

const Tab = createBottomTabNavigator();

function openWebSocket() {
    let ws = new WebSocket(config.websocket_ip);
    ws.onopen = () => {
        console.log("connection established");
        ws.send(JSON.stringify({ type: "user", message: "d" }));
        console.log("sent message");
        clearInterval(global.interval);
    };

    ws.onclose = () => {
        // connection closed
        console.log("connection closed");
        global.interval = setInterval(() => {
            console.log("attempting to reconnect");
            global.ws = openWebSocket();
            clearInterval(global.interval);
        }, 1000 * 5);
    }
    ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if(data.type == "data") {
            global.serverId = data.id;
        }
        console.log(`received: ${e.data}`);
        
    };
    return ws;
}

export default function App() {
    
    useEffect(() => {
        global.ws = openWebSocket();
    });

    return (
        <NavigationContainer>
            {/* initialRouteName is the page that's loaded on app launch */}
            {/* The name attribute indicates the text that appears under each icon in the nav bar at the bottom of the screen */}
            <Tab.Navigator initialRouteName="Login">
                <Tab.Screen name="Sign-Out" component={LoginScreen} />
                <Tab.Screen name="Chat" component={ChatScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
