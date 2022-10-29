import { useState, useRef } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import Chat from "../elements/Chat";

export default ({ navigation }) => {
    let [text, setText] = useState("");
    let [messages, setMessages] = useState([]);
    
    const inputRef = useRef();

    global.ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if(data.type == "message") {
            console.log("message recieved")
            setMessages([
                ...messages,
                {
                    id: Math.random().toString(12).substring(0),
                    message: data.message,
                    prefix: "recieved: ",
                },
            ]);
        } else if(data.type == "data") {
            global.serverId = data.id;
        }
        // a message was received
        console.log(`received: ${e.data}`);
        
    };
    //connect(global.ws);

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
                        const message = {
                            type: "message",
                            message: text,
                            id: global.serverId ?? -1,
                        }
                        global.ws.send(JSON.stringify(message));
                        text = "";
                        inputRef.current.setNativeProps({ text: "" });
                        inputRef.current.blur();
                        console.log("sent");
                    }}
                ></Button>
            </View>
            <View>
                <Text>Messages</Text>
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