import { Text, View, Image,ScrollView, TextInput, Alert, ActivityIndicator, } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios"; // npm install axios

const NewDetail = ({navigation, route}) => {
  const [item, setitem] = useState([])
  const [loading, setloading] = useState(true)
  useEffect(() => {
    fetch("https://serverjs-api-6faec46c5c5a.herokuapp.com/new/"+ route.params.id)
    .then((res) => res.json())
    .then((result)=>{
      setitem(result)
      setloading(false)
    })
  }, [])

  const [adduser, setadduser] = useState({})
  const fetchUser = async () => {
    const accessToken = await AsyncStorage.getItem("@accessToken")
    const response = await fetch("https://maingo-api-14c0a3c619c5.herokuapp.com/users/profile",{
      method : "GET",
      headers : {"Content-Type" : "application/json", "Authorization" : "Bearer "+ accessToken},
    })
    const data = await response.json()
    //console.log(data) 
    if (data.status === "forbiden") {
      navigation.navigate("LoginP")
    }
    setadduser(data.user)
    setloading(false)
    //console.log(data)
  }
  useEffect(() => {
    fetchUser()
  },[loading])

  const addUserin = () => {
    axios
      .post("http://10.0.2.2:3000/add-user", {
        users: adduser.Username,
        activity_id: route.params.id, // ผูกชื่อกับ attraction_id นี้
      })
      .then((response) => {
        if (response.data.success) {
          Alert.alert("Success", response.data.message);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          Alert.alert("Error", error.response.data.message); // แจ้งเตือนเมื่อชื่อซ้ำ
        } else {
          Alert.alert("Error", "Something went wrong!");
        }
      });
  };

  return (
    <ScrollView style={{backgroundColor: '#71dea9',}} >
    <View >
      {loading ? 
        <View style={{alignSelf: "center", marginVertical: 20}} >
            <Text style={{fontSize: 25, alignSelf: "center"}}>กำลังโหลด รอสักครู่</Text>
        </View>
       : 
        <View >
          <Text style={{ fontSize: 30, marginLeft: 10, marginVertical: 10 }}>{item.name}</Text>
          <Image
            source={{ uri: item.image }}
            style={{ width: "100%", height: 300, alignSelf: "center", resizeMode: 'stretch' }}
          />
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 25, marginLeft: 10 }}>รายละเอียด :</Text>
            <Text style={{ fontSize: 20, marginLeft: 10 }}>{item.detail}</Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 25, marginLeft: 10 }}>จำนวนตราปั๊ม : {item.stamp}</Text>
            <Button icon="arrow-up-box" mode="elevated" textColor="black" onPress={addUserin} style={{paddingVertical: 5, width: "90%", alignSelf: 'center', marginVertical: 10}}  >ลงชื่อเข้าร่วมกิจกรรม</Button>
          </View>
        </View>
      }
    </View>
    </ScrollView>
  )
}

export default NewDetail