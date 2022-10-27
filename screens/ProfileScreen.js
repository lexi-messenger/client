import { View, Text, Button } from "react-native";

export default ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>Profile Screen</Text>
            <Button
                title="go to chat"
                onPress={() => navigation.navigate("Chat")}
            />
        </View>
    );
};
