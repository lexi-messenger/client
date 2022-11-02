// Fonts: https://github.com/JulietaUla/Montserrat/tree/master/fonts/ttf

import React from "react";
import { View, Image, Text, Button, StyleSheet } from "react-native";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';


import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ChatScreen from "./screens/ChatScreen";

import config from "./config.js";

const Tab = createBottomTabNavigator();

const uiScale = 50;

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
    };
    ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type == "data") {
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
        // <View>
            <NavigationContainer>
                {/* initialRouteName is the page that's loaded on app launch */}
                {/* The name attribute indicates the text that appears under each icon in the nav bar at the bottom of the screen */}
                <Tab.Navigator initialRouteName="Sign-Out" screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Sign-Out') {
                            return <Image
                                style={{
                                    width: uiScale,
                                    height: uiScale,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                source={require("./assets/logout.png")}
                            />

                            // iconName = focused
                            //     ? 'log-out-outline'
                            //     : 'log-out-sharp';
                        } else if (route.name === 'Chat') {
                            return <Image
                                style={{
                                    width: uiScale,
                                    height: uiScale,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                source={require("./assets/chat.png")}
                            />

                            //iconName = focused ? 'chatbubbles-outline' : 'chatbubbles-sharp';
                        }

                        // You can return any component that you like here!
                        return <Image
                            style={{
                                width: uiScale,
                                height: uiScale,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            source={require("./assets/profile.png")}
                        />
                        //return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    //tabBarActiveTintColor: 'tomato',
                    //tabBarInactiveTintColor: 'gray',
                })}
                >
                    <Tab.Screen name="Sign-Out" component={LoginScreen}/>
                    <Tab.Screen name="Chat" component={ChatScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        // </View>
    );
}
