import { StyleSheet, View, Text, Button } from "react-native";
import { useState, useRef } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { languages } from "google-translate-api-x";

export default ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>Language</Text>
            <SelectDropdown
                data={Object.values(languages)}
                defaultButtonText={'Select language'}
                defaultValueByIndex={Object.keys(languages).indexOf("en")}
                onSelect={(selectedItem, index) => {
                    global.lang = Object.keys(languages)[index];
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                }}
                search
                searchPlaceHolder={"Search here"}
                searchPlaceHolderColor={"darkgrey"}
            />
            
            <Button
                title="go to chat"
                onPress={() => navigation.navigate("Chat")}
            />
        </View>
    );
};
