import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    FlatList,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

let ws = new WebSocket("ws://192.168.29.91:8080");
let interval;

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title1}>{title}</Text>
    </View>
);

export default function App() {
    let [text, setText] = useState("");
    let [messages, setMessages] = useState([]);
    const inputRef = useRef();

    function connect(socket) {
        ws.onopen = () => {
            console.log("connection established");
            ws.send("message from phone");
            console.log("sent message");
            clearInterval(interval);
        };
        ws.onclose = (e) => {
            // connection closed
            console.log("connection closed");
            if (!interval) {
                console.log("no interval");
                interval = setInterval(() => {
                    console.log("attempting to reconnect");
                    ws = new WebSocket("ws://192.168.29.91:8080");
                    connect(ws);
                }, 1000 * 5);
            }
        };
        ws.onmessage = (e) => {
            // a message was received
            console.log(`received: ${e.data}`);
            setMessages([...messages, {
                id: Math.random().toString(12).substring(0),
                message: e.data,
                prefix: "recieved: "
            }]);
        };
    }
    connect(ws);

    const renderItem = ({ item }) => <Item title={item.prefix + item.message} />;

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type here!"
                    onChangeText={(newText) => setText(newText)}
                    ref={inputRef}
                />
                <Button
                    title="send"
                    onPress={() => {
                        setMessages([...messages, {
                            id: Math.random().toString(12).substring(2),
                            message: text,
                            prefix: "sent: "
                        }]);
                        ws.send(text);
                        text = "";
                        inputRef.current.setNativeProps({ text: "" });
                        inputRef.current.blur();
                    }}
                ></Button>
                <Button
                    title="close"
                    onPress={() => {
                        ws.close();
                    }}
                ></Button>
            </View>
            <View>
                <Text>Messages</Text>
                <FlatList
                    data={[...messages].reverse()}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    inverted
                    //contentContainerStyle={{ flexDirection: 'column-reverse' }}
                ></FlatList>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#fff",
        alignItems: "center",
        margin: 40,
        justifyContent: "center",
    },
    title: {
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        height: 40,
        width: "50%",
        borderWidth: 1,
        margin: 10,
    },
    child: {
        width: 40,
    },

    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title1: {
        fontSize: 16,
    },
});
