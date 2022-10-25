import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Item from "./Item";

const renderItem = ({ item }) => <Item title={item.prefix + item.message} />;

export default ({ messages }) => (
    <FlatList
        style={styles.messages}
        data={[...messages].reverse()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
    ></FlatList>
);

const styles = StyleSheet.create({
    messages: {
        margin: 30,
    },
});
