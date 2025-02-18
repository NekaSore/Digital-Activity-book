import { Text, View, FlatList, Image, Pressable, StyleSheet, } from "react-native";
import React, { useState, useEffect } from "react";

const New = ({ navigation }) => {
  const [item, setitem] = useState([])
  const [loading, setloading] = useState(true)
  useEffect(() => {
    fetch("https://serverjs-api-6faec46c5c5a.herokuapp.com/new") // 10.0.2.2 it local host some how
      .then((res) => res.json())
      .then((result) => {
        setitem(result)
        setloading(false)
      })
  }, [loading])

  const RenderMyItem = ({ item }) => (
    <View style={sty.con}>
      <Pressable onPress={() => Detail(item.id)}>
        <Text style={{ fontSize: 30, textAlign: "center" }}>{item.name}</Text>
        {/* <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: 300 }}
        /> */}
      </Pressable>
    </View>
  )
  const Detail = (id) => {
    navigation.navigate("P_Detail", { id: id });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#71dea9' }} >
      {loading ?
        <View style={{ alignSelf: "center", marginVertical: 20, }} >
          <Text style={{ fontSize: 25 }}>กำลังโหลด รอสักครู่</Text>
        </View>

        :
        <FlatList
          data={item}
          renderItem={RenderMyItem}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={() => setloading(true)}
          style={{ marginTop: 25 }}
        />
      }
    </View>
  )
}

const sty = StyleSheet.create({
  con: {
    alignSelf: "center",
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
    width: "90%"
  },
});

export default New