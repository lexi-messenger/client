import React from "react";
import { View } from "react-native";

export default Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title1}>{title}</Text>
    </View>
);
