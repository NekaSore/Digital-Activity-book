import { View, Image, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'// npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler
import { StatusBar } from 'expo-status-bar'

const Start = ({ navigation }) => {
    const NextPage = () => {
        navigation.navigate("P_Login")
    }


    return (
        <Pressable onPress={NextPage} >
            <View style={sty.con} >
                <View style={{ flex: 0.95, justifyContent: "center", }} >
                    <Image source={require("../stuff/ytc.png")} style={{ width: 250, height: 250, }} />
                </View>
                <View style={{ flex: 0.05 }} >
                    <Link href="https://steamcommunity.com/id/NekaSore" style={{ fontSize: 15, color: "white" }}>
                        In BETA ver 0.1.5
                    </Link>
                </View>
                <StatusBar style="auto" />
            </View>
        </Pressable>
    )
}

const sty = StyleSheet.create({
    con: {
        height: "100%",
        alignItems: "center",
        backgroundColor: '#71dea9',
    },
});

export default Start