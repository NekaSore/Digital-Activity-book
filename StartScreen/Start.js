import { View, Image, Pressable, StyleSheet, Text, } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'// npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler
import { StatusBar } from 'expo-status-bar'

const Start = ({ navigation }) => {
  const NextPage = () => {
    navigation.navigate("P_Login")
  }


  return (
    <Pressable onPress={NextPage}>
      <View style={styles.con}>
        <View style={styles.logo}>
          <Image
            source={require("../stuff/ytc.png")}
            style={{ width: 250, height: 250 }}
          />
          <View style={styles.Headcon}>
                <Text style={styles.HeadText}>
                    Digital Activity Book
                </Text>
          </View>
          <View style={{ flex: 0.05 }}>
              <Text style={{ color: "white", textAlign: "center" }}>
                แตะเพื่อเข้าสู่ระบบ
              </Text>
          </View>
        </View>
        <View style={{ flex: 0.05 }}>
          <Link href="https://steamcommunity.com/id/NekaSore" style={styles.Bottomtext}>
            Ver 1.0.0
          </Link>
        </View>
        <StatusBar style="auto" />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  con: {
    height: "100%",
    alignItems: "center",
    backgroundColor: "#71dea9",
  },
  logo: {
    flex: 0.95,
    justifyContent: "center",
    alignItems: "center"
  },
  Headcon: {
    marginVertical: 10,
    alignItems: "center",
  },
  HeadText: {
    fontSize: 25, 
    fontWeight: "bold", 
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
  },
  Bottomtext: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default Start