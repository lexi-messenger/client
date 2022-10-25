import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title1}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
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
