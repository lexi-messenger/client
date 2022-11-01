import { useState, useRef } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import Chat from "../elements/Chat";

import translate, { languages } from "google-translate-api-x";

//time formatting
function timeSince(date) {
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const timeSent = new Date(date);
    const daysAgo = Math.round(Date.now() / day) - Math.round(date / day);

    if (daysAgo < 1) {
        return (
            "today at " +
            timeSent
                .toLocaleTimeString()
                .substring(0, timeSent.toLocaleTimeString().length - 3)
        );
    }

    if (daysAgo == 1) {
        return (
            "yesterday at " +
            timeSent
                .toLocaleTimeString()
                .substring(0, timeSent.toLocaleTimeString().length - 3)
        );
    }

    if (daysAgo > 1) {
        return daysAgo + " days ago";
    }
}

//   example:
//   var aDay = 24*60*60*1000;
//   console.log(timeSince(new Date(Date.now()-aDay)));
//   would return "24 hours"

export default ({ navigation }) => {
    //state functions to set inputs to variables that will be shipped with each message
    //we need message text, userSent, and userRecieved
    let [text, setText] = useState("");
    let [receiver, setReceiver] = useState("");

    let [messages, setMessages] = useState([]);

    const messageRef = useRef();
    const receiverRef = useRef();

    global.ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type == "message") {
            console.log("message recieved");

            translate(data.message, { to: global.lang ?? "en" })
                .then((res) => {
                    setMessages([
                        ...messages,
                        {
                            // //for displaying messages
                            // OLD METHOD:
                            // id: Math.random().toString(12).substring(0),
                            // message: data.message,
                            // inOrOutbound: "in",
                            // prefix: "recieved " + timeSince(data.timeSent) + " from " + data.userSent + ": ",

                            //NEW METHOD THAT ALLOWS FORMATTING IN Chat.js
                            //for displaying messages
                            id: Math.random().toString(12).substring(0),
                            message: `${res.text}\noriginal: ${
                                data.message
                            }\nfrom ${languages[res.from.language.iso]} to ${
                                global.lang ? languages[global.lang] : "English"
                            }`,
                            inOrOutbound: "in",
                            timeSent: timeSince(data.timeSent),
                            //userSent: data.userSent //already included in data so no need to refrence again
                        },
                    ]);
                })
                .catch((err) => {
                    console.error(err);
                });
        } else if (data.type == "data") {
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
                    // Input field for the message to be sent
                    style={styles.textInput}
                    placeholder="Message..."
                    onChangeText={(newText) => setText(newText)}
                    ref={messageRef}
                />
                {/* line break */}
                <Text>{"\n"}</Text>
                <TextInput
                    // Input field for message recipient (will be removed after screen of friends is added)
                    style={styles.textInput}
                    placeholder="To..."
                    onChangeText={(newReceiver) => setReceiver(newReceiver)}
                    ref={receiverRef}
                />
                {/* everything for sending messages happens here */}
                <Button
                    title="send"
                    onPress={() => {
                        if (text.length < 1) return;
                        setMessages([
                            ...messages,
                            {
                                id: Math.random().toString(12).substring(2),
                                message: text,
                                inOrOutbound: "out",
                                prefix: "sent: ",
                            },
                        ]);

                        //Message format:
                        /* type: "message",
                       userSent: userSent,
                       userReceiving: userReceiving,
                       timeSent: timeSent,
                       message: data.message,
                       id: userSent's id
                    */

                        const message = {
                            type: "message",
                            userSent: global.userSent, //change this to username once we have that set up
                            userReceiving: receiver,
                            //timeSent: new Date().toDateString(),  set on server-side
                            message: text,
                            id: global.serverId ?? -1,
                        };
                        global.ws.send(JSON.stringify(message));
                        setText("");
                        messageRef.current.setNativeProps({ text: "" });
                        messageRef.current.blur();
                        console.log(`sent: ${message}`);
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
