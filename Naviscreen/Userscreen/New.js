import { Text, View, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';

const New = ({ navigation }) => {
  const [item, setitem] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetch("https://serverjs-api-6faec46c5c5a.herokuapp.com/new")
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setitem(result);
        setloading(false);
      });
  }, [loading]);

  const Detail = (id) => {
    navigation.navigate("P_Detail", { id: id });
  };

  const RenderMyItem = ({ item }) => (
    <View style={styles.con}>
      <TouchableOpacity  onPress={() => Detail(item.event_id)}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.event_name}</Text>
        </View>
        <View style={styles.dateAndStampContainer}>
          <Text style={styles.date}>{item.event_date}</Text>
          <Text style={styles.stamp}>{item.event_point} ตราปั๊ม</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#71dea9' }}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#323235" />
          <Text style={styles.loadingText}>กำลังโหลด รอสักครู่...</Text>
        </View>
      ) : (
        <FlatList
          data={item}
          renderItem={RenderMyItem}
          keyExtractor={(item) => item.event_id}
          refreshing={loading}
          onRefresh={() => setloading(true)}
          style={{ marginTop: 25 }}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    alignSelf: "center",
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
    width: "90%",
    backgroundColor: 'white',
    paddingVertical: 35,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  nameContainer: {
    marginBottom: 20, // Give space below the name
  },
  name: {
    fontSize: 25,
    alignSelf: "flex-start"
  },
  dateAndStampContainer: {
    flexDirection: 'row', // Align date and stamp horizontally
    justifyContent: 'space-between', // Optional: Space between date and stamp
    alignItems: 'center', // Center both elements vertically
  },
  date: {
    fontSize: 20,
    color: "#333",
  },
  stamp: {
    fontSize: 20,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#333",
    marginTop: 10,
  },
});

export default New;
