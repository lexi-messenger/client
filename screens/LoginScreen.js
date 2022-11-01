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
            <Text style={{}}>Login</Text>
            {/* TextInput below should be relayed to a global variable that saves userSent for each message */}
            <TextInput
                placeholder="Username"
                onPress={(username) => (global.userSend = username)} //INCOMPLETE
            />
            <TextInput secureTextEntry={true} placeholder="Password" />
            <Button
                title="Login"
                onPress={() => navigation.navigate("Profile")}
            />
        </View>
    );
};
