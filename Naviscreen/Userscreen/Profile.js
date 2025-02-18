import { View, Text, Image, StyleSheet, } from 'react-native'
import React, { useEffect, useState, } from 'react'
import { Button } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar';


const Profile = ({ navigation }) => {
  // เอาข้อมูล User
  const [user, setuser] = useState({})
  const [loading, setloading] = useState(true)
  const fetchUser = async () => {
    const accessToken = await AsyncStorage.getItem("@accessToken")
    const response = await fetch("https://maingo-api-14c0a3c619c5.herokuapp.com/users/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + accessToken },
    })
    const data = await response.json()
    //console.log(data) 
    if (data.status === "forbiden") {
      navigation.navigate("LoginP")
    }
    setuser(data.user)
    setloading(false)
  }
  useEffect(() => {
    fetchUser()
  }, [loading])

  const GoBack = () => {
    navigation.navigate("P_Login")
  }

  return (
    <View style={sty.con}>
      <View style={{ alignSelf: "center", marginTop: 35 }} >
        <Image source={{ uri: user.Avatar }} style={{ width: 250, height: 250, borderRadius: 10 }} />
      </View>
      <View style={{ marginHorizontal: 20, marginVertical: 15, borderRadius: 20, borderWidth: 1, padding: 10 }}>
        <Text style={{ fontSize: 25, }} >ชื่อ : {user.Firstname}</Text>
        <Text style={{ fontSize: 25, }} >สกุล : {user.Lastname}</Text>
        <Text style={{ fontSize: 25, }} >สาขาวิชา : <Text style={{ fontSize: 24, }} >{user.Department}</Text></Text>
        <Text style={{ fontSize: 25, }} >รหัสนักศึกษา : {user.Username}</Text>
        <Text style={{ fontSize: 25, }} >ตราปั๊มทั้งหมด : {user.User_stamp}</Text>
      </View>
      <Image source={require("../../stuff/QRsample.png")} style={sty.QRpic} />
      <Button icon="step-backward" mode="elevated" textColor="black" style={sty.BT_out} onPress={GoBack} >Back</Button>
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
  QRpic: {
    resizeMode: 'contain', 
    width: 200, 
    height: 200, 
    alignSelf: 'center', 
    borderRadius: 10
  },
  BT_out: {
    paddingVertical: 5, 
    width: "90%", 
    alignSelf: 'center', 
    marginTop: 10,
  }
});

export default Profile