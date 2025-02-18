import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import { TextInput, Button } from "react-native-paper"; // npm install react-native-paper และ npm install react-native-vector-icons
import React, { useState, useRef } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"; // npm install @react-native-async-storage/async-storage
import { StatusBar } from 'expo-status-bar';

const Login = ({ navigation }) => {
    const [IDpass, setIDpass] = useState("")
    const [Dobpass, setDobpass] = useState("")
    const handlogin = async () => {
        const response = await fetch("https://maingo-api-14c0a3c619c5.herokuapp.com/login", { // api สำหรับ login
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                username: IDpass,
                password: Dobpass,
                //expiresIn: 10,
            }),
        })
        const data = await response.json()
        if (data.status === "ok") {
            await AsyncStorage.setItem("@accessToken", data.accessToken);
            // const accessToken = await AsyncStorage.getItem("@accessToken");
            // console.log(accessToken);
            navigation.navigate("P_Navi")
        } else {
            Alert.alert(data.status, data.message, [
                { text: "OK" },
            ])
        }
    }

    const IP2 = useRef(null);

    return (
        <View style={sty.con}>
            <View style={{ alignSelf: "center", paddingBottom: 150, }} >
                <Image source={require("../stuff/ytc.png")} style={{ width: 250, height: 250, }} />
            </View>
            <View style={sty.IP_sty}>
                <TextInput label={"รหัสประจำตัว"}
                    value={IDpass}
                    onChangeText={(text) => setIDpass(text)}

                    onSubmitEditing={() => IP2.current.focus()}

                    keyboardType="default"
                    style={{ color: "#FFF", fontSize: 20 }} />
            </View>
            <View style={sty.IP_sty}>
                <TextInput label={"รหัสผ่าน"}
                    value={Dobpass}
                    onChangeText={(text) => setDobpass(text)}

                    onSubmitEditing={handlogin}
                    ref={IP2}

                    secureTextEntry
                    style={{ color: "#FFF", fontSize: 20 }} />
            </View>
            <View style={sty.BT_sty}>
                <Button icon="login" mode="elevated" textColor="black" style={{ paddingVertical: 5, }} onPress={handlogin} >LOGIN</Button>
            </View>
            <View style={{ alignItems: 'center', marginTop: 50, }} >
                <Text style={{ fontSize: 15, color: "white" }}>
                    หากลืมรหัสกรุณาติดต่อทางวิทยาลัย
                </Text>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const sty = StyleSheet.create({
    con: {
        width: "100%",
        flex: 1,
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: '#71dea9',
    },
    IP_sty: {
        paddingBottom: 5,
        color: "#FFF",
        alignSelf: "center",
        width: "80%"
    },
    BT_sty: {
        paddingVertical: 25,
        alignSelf: "center",
        width: "80%"
    },

});

export default Login
