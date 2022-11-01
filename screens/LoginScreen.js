import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

//fonts not working, Lewis doesn't know why

//import rnTextSize, { TSFontSpecs } from 'react-native-text-size';

// const styles = StyleSheet.create({
//     titleText: {
//       //fontSize: 150,
//       //fontWeight: "bold"
//     }
//   });

export default function LoginScreen({ navigation }) {
    // userName is saved to device and changes after the text field is submitted in this page
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const submitForm = () => {
        global.user = userName
        console.log(global.user)
        navigation.navigate("Profile")
    }
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>Login</Text>
            {/* TextInput below should be relayed to a global variable that saves userSent for each message */}
            <TextInput placeholder="Username" 
                onChangeText={(value) => setUserName(value)}
            />
            <TextInput secureTextEntry={true} placeholder="Password" onChangeText={(value) => setPassword(value)}/>
            <Button title="Login" 
                onPress={submitForm}
            />
        </View>
    );
    
};
