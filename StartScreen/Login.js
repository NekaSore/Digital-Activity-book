import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import { TextInput, Button } from "react-native-paper"; // npm install react-native-paper และ npm install react-native-vector-icons
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"; // npm install @react-native-async-storage/async-storage
import { StatusBar } from 'expo-status-bar';
import NetInfo from "@react-native-community/netinfo" // npm install @react-native-community/netinfo
 
const Login = ({ navigation }) => {
    const [IDpass, setIDpass] = useState("");
    const [Dobpass, setDobpass] = useState("");
 
    // Check if user is already logged in (auto-login)
    useEffect(() => {
        const checkLoginStatus = async () => {
            const accessToken = await AsyncStorage.getItem("@accessToken");
            if (accessToken) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "P_Navi" }],
                  });
            }
        };
 
        checkLoginStatus();
    }, [navigation]);
 
 
    const handlogin = async () => {
        // Check Internet
        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
            Alert.alert("error", "กรุณาเชื่อมต่ออินเทอร์เน็ตแล้วลองอีกครั้ง", [{ text: "OK" }]);
            return;
        }

        // Check if both IDpass or Dobpass is empty
        if (!IDpass || !Dobpass) {
            Alert.alert("error", "กรุณากรอกข้อมูลให้ครบถ้วน", [{ text: "OK" }]);
            return;  // Stop further execution if either field is empty
        }

        const response = await fetch("https://maingo-api-c1bde2c6610c.herokuapp.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: IDpass,
                password: Dobpass,
            }),
        });
        const data = await response.json();
        if (data.status === "ok") {
            await AsyncStorage.setItem("@accessToken", data.accessToken);
            navigation.reset({
                index: 0,
                routes: [{ name: "P_Navi" }],
              });
        }
        else {
            Alert.alert(data.status, data.message, [
                { text: "OK" },
            ]);
        }
    };
   
    const IP2 = useRef(null);
 
    return (
        <View style={styles.con}>
            <View style={{ alignSelf: "center", paddingBottom: 130 }}>
                <Image source={require("../stuff/ytc.png")} style={{ width: 250, height: 250 }} />
            </View>
            <View style={styles.IP_sty}>
            <Text style={styles.heading}>กรุณาเข้าสู่ระบบ</Text>
                <TextInput label={"รหัสประจำตัว"}
                    value={IDpass}
                    onChangeText={(text) => setIDpass(text)}
                    onSubmitEditing={() => IP2.current.focus()}
                    keyboardType="default"
                    style={styles.input} />
            </View>
            <View style={styles.IP_sty}>
                <TextInput label={"รหัสผ่าน"}
                    value={Dobpass}
                    onChangeText={(text) => setDobpass(text)}
                    onSubmitEditing={handlogin}
                    ref={IP2}
                    secureTextEntry
                    style={styles.input} />
            </View>  
            <View style={styles.BT_sty}>
                <Button icon="login" mode="elevated" textColor="black" style={{ paddingVertical: 5 }} onPress={handlogin}>เข้าสู่ระบบ</Button>
            </View>
            <View style={{ alignItems: 'center', marginTop: 50 }}>
                <Text style={{ fontSize: 15, color: "white" }}>
                    หากลืมรหัสกรุณาติดต่อทางวิทยาลัย
                </Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
};
 
 
const styles = StyleSheet.create({
    con: {
        width: "100%",
        flex: 1,
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: '#71dea9',
    },
    IP_sty: {
        paddingBottom: 5,
        alignSelf: "center",
        width: "80%",
    },
    BT_sty: {
        paddingVertical: 25,
        alignSelf: "center",
        width: "80%",
    },
    heading: {
        fontSize: 24,
        color: "white",
        marginBottom: 10,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "transparent",
        color: "#FFF",
        fontSize: 20,
        height: 50,
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#FFF",
    },
});
 
 
export default Login;