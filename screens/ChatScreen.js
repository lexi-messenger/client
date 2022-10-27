import { useState, useRef } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import Chat from "../elements/Chat";

export default ({ navigation }) => {
    let [text, setText] = useState("");
    let [messages, setMessages] = useState([]);
    const inputRef = useRef();

    function connect(socket) {
        socket.onopen = () => {
            console.log("connection established");
            socket.send("message from phone");
            console.log("sent message");
            clearInterval(global.interval);
        };
        socket.onclose = (e) => {
            // connection closed
            console.log("connection closed");
            if (!global.interval) {
                console.log("no interval");
                global.interval = setInterval(() => {
                    console.log("attempting to reconnect");
                    global.ws = new WebSocket("ws://192.168.29.91:8080");
                    connect(global.ws);
                }, 1000 * 5);
            }
        };
        socket.onmessage = (e) => {
            // a message was received
            console.log(`received: ${e.data}`);
            setMessages([
                ...messages,
                {
                    id: Math.random().toString(12).substring(0),
                    message: e.data,
                    prefix: "recieved: ",
                },
            ]);
        };
    }
    connect(global.ws);

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
                        setMessages([
                            ...messages,
                            {
                                id: Math.random().toString(12).substring(2),
                                message: text,
                                prefix: "sent: ",
                            },
                        ]);
                        global.ws.send(text);
                        text = "";
                        inputRef.current.setNativeProps({ text: "" });
                        inputRef.current.blur();
                    }}
                ></Button>
                <Button
                    title="close"
                    onPress={() => {
                        global.ws.close();
                    }}
                ></Button>
            </View>
            <View>
                <Text>Messages</Text>
                <Button
                    title="profile"
                    onPress={() => navigation.navigate("Profile")}
                />
                <Chat messages={messages}></Chat>
            </View>
        </View>
    );
};

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
});
