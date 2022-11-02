import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Item from "./Item";

//Render two different components depending on if a message is inbound or outbound

//sent messages
const renderItem = ({ item }) => <Item  title={item.prefix + item.message} clientMessage={item.clientMessage} />;

export default ({ messages }) => (
    <FlatList
        style={styles.messages}
        data={[...messages].reverse()}
        // the next line is called to render the text bubble
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
    ></FlatList>
);

const styles = StyleSheet.create({
    messages: {
        //alignItems: 'baseline',
        margin: 10,
        borderRadius: 10,
    },
});
