import { useState } from "react";
import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";

//getting fonts to work

// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

const styles = StyleSheet.create({
    title: {
        //flex: 1,
        //flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6db079',
        borderWidth: 10,
        borderColor: '#A5CBAC',
        color: '#f8f1f7',
        fontSize: 70,
        borderRadius: 25,
        // fontFamily: "Montserrat-ExtraBold",
    },
    subtitle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eae3fd',
        borderWidth: 7,
        borderColor: "#F1EAFA",
        color: '#707786',
        fontSize: 20,
        borderRadius: 25,
        // fontFamily: "Montserrat-Regular",
    }
});


export default function LoginScreen({ navigation }) {
    // const [fontsLoaded] = useFonts({
    //     'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    // });

    // //fontsLoaded.loadAsync.RCTText()

    // const onLayoutRootView = useCallback(async () => {
    //     if (fontsLoaded) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [fontsLoaded]);

    // if (!fontsLoaded) {
    //     return null;
    // }

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
                
                backgroundColor: '#f9fff9',

            }}
        >
            <View
                style={{
                    position: 'relative',
                    top: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 20,
                }}
            >
                <Image source={require("../assets/LexiTitle.png")}
                    style={{
                        resizeMode: "stretch",
                        height: 285 * 0.6,
                        width: 652 * .6,
                        marginBottom: '5%',

                    }}
                ></Image>
                {/* <Text style={styles.title}> Lexi </Text>
            <Text style={styles.subtitle}> The World's Messenger </Text> */}

                <Text>{"\n"}</Text>
                {/* TextInput below should be relayed to a global variable that saves userSent for each message */}
                <TextInput

                    placeholder="Username"
                    onChangeText={(value) => setUserName(value)}
                />
                <TextInput secureTextEntry={true} placeholder="Password" onChangeText={(value) => setPassword(value)} />
                <View style={{marginTop: 10,}}></View>
                <Button title="Login"
                    color="#6DB079"
                    onPress={submitForm}
                />
            </View>
        </View>
    );

};
