import { View, Text, TextInput, Button } from "react-native";

export default ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>Login</Text>
            <TextInput placeholder="Username" />
            <TextInput placeholder="Password" />
            <Button title="Login" />
        </View>
    );
};
