import { View, Image, Text, Button } from "react-native";



export default ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>Profile: </Text>
            {/* display username */}
            <Text></Text>
            <Image style={{
                width: 150,
                height: 150,
            }} source={require('../assets/FrogFrame.png')} />
            <Button
                title="go to chat"
                onPress={() => navigation.navigate("Chat")}
            />
        </View>
    );
};
