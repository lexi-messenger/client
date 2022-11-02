import { View, Image, Text, Button } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { languages } from "google-translate-api-x";

export default function App({ navigation }) {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{color: "#1C3520", fontSize: 40, fontWeight: "bold",}}>Profile</Text>
            {/* display username */}
            <Text>
                Username: {global.user}
            </Text>
            <Image
                style={{
                    width: 150,
                    height: 150,
                }}
                source={require("../assets/FrogFrame.png")}
            />

            <Text style={{marginBottom: 10,}}>Language:</Text>
            <SelectDropdown
                data={Object.values(languages)}
                defaultButtonText={"Select language"}
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
                searchPlaceHolderColor={"#A5CBAC"}
                
            />
            <View style={{marginTop: 10,}}></View>
            <Button
                title="go to chat"
                color="#6DB079"
                onPress={() => navigation.navigate("Chat")}
            />
        </View>
    );
};
