import { View, Text, FlatList, Image, } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const History = () => {
  const [item, setitem] = useState([])
  const [loading, setloading] = useState(true)

  const [user, setuser] = useState({})
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


  useEffect(() => {
    fetch("http://10.0.2.2:3000/history?users=" + user.Username)
      .then((res) => res.json())
      .then((result) => {
        setitem(result)
        console.log(result)
        setloading(false)
      })
  }, [])

  const RenderMyItem = ({ item }) => (
    <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
      <View style={{ flex: 1, borderRightWidth: 1, justifyContent: 'center', }}>
        <Text style={{ fontSize: 15, marginLeft: 10 }}>{item.activity_id}</Text>
      </View>
      <View style={{ flex: 1.2, borderRightWidth: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 15, marginLeft: 10 }}>{item.activity_name}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', padding: 5 }}>
        <Image source={{ uri: item.activity_coverimage }} style={{ width: "100%", height: 150, resizeMode: 'contain', }} />
      </View>
    </View>
  )

  return (
    <View style={{ width: "100%", flex: 1, backgroundColor: '#71dea9', }}>
      <Text style={{ alignSelf: 'center', fontSize: 25, marginVertical: 20 }} >กิจกรรมองค์การ / วิทยาลัย.</Text>

      <View style={{ flexDirection: 'row', borderWidth: 1, backgroundColor: '#d3e9e0', padding: 15 }}>
        <View style={{ flex: 1, }}>
          <Text style={{ fontSize: 15, alignSelf: 'center' }}>วัน/เดือน/ปี</Text>
        </View>
        <View style={{ flex: 1, }}>
          <Text style={{ fontSize: 15, alignSelf: 'center' }}>ชื่อกิจกรรม</Text>
        </View>
        <View style={{ flex: 1, }}>
          <Text style={{ fontSize: 15, alignSelf: 'center' }}>สติกเกอร์</Text>
        </View>
      </View>

      <FlatList
        data={item}
        renderItem={RenderMyItem}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={() => setloading(true)}
      />
    </View>
  )
}

export default History