import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default Item = ({ title }) => {
    return (
        <View style={styles.item}>
            <Text style={styles.title1}>{title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#1982FC",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 30,
    },
    title1: {
        fontSize: 16,
        color: 'white'
    },
});
