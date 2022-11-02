import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default Item = ({ title, clientMessage }) => {
    // if message is sent
    if (clientMessage) {
        return (
            // <View style={[{flexDirection: 'column', alignItems: 'flex-end'}, styles.sent]}>
            <View style={styles.sent}>
                <Text style={styles.title1}>{title}</Text>
            </View>
        )
    }
    // if message is received
    return (
        // <View style={[{flexDirection: 'column', alignItems: 'flex-start'}, styles.received]}>
        <View style={styles.received}>
            <Text style={styles.title1}>{title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    sent: {
        backgroundColor: "#6db079",
        padding: 20,
        borderColor: "#A5CBAC",
        borderWidth: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 30,
    },
    received: {
        backgroundColor: "#8E97A4",
        padding: 20,
        borderColor: "#A4ACB6",
        borderWidth: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 30,
    },
    title1: {
        fontSize: 16,
        color: "white",
    },
});
