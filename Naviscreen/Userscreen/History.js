import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

const History = ({ navigation }) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  // Fetch user profile
  const fetchUser = async () => {
    const accessToken = await AsyncStorage.getItem("@accessToken");
    const response = await fetch("https://maingo-api-c1bde2c6610c.herokuapp.com/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      },
    });
    const data = await response.json();
    if (data.status === "forbidden") {
      navigation.navigate("LoginP");
    }
    setUser(data.user);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [loading]);

  // Fetch user's history after the user is loaded
  useEffect(() => {
    if (user.Username) {
      fetch(`https://serverjs-api-6faec46c5c5a.herokuapp.com/history2?users=${user.Username}`)
        .then((res) => res.json())
        .then((result) => {
          //console.log(result);
          setItem(result);
          setLoading(false);
        });
    }
  }, [user]);

  const Detail = (id) => {
    navigation.navigate("P_Detail", { id: id });
  };

  // Render history item
  const RenderMyItem = ({ item }) => (
    <TouchableOpacity onPress={() => Detail(item.event_id)}>
      <View style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>{item.event_date}</Text>
        </View>
        <View style={styles.itemMiddle}>
          <Text style={styles.itemText}>{item.event_name}</Text>
          <Text style={styles.itemText}>สถานะ : {item.check_status === 1 ? "เข้าร่วมแล้ว" : (item.check_status === 0 || item.check_status === null ? "ยังไม่เข้าร่วม" : item.check_status)}</Text>
        </View>
        {/* <View style={styles.itemRight}>
        <Image source={{ uri: item.event_coverimage }} style={styles.itemImage} />
      </View> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>


      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#323235" />
          <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
        </View>
      ) : (
        <View >
          <Text style={styles.headerText}>
            กิจกรรมองค์การ / วิทยาลัย
          </Text>
          <View style={styles.tableHeader}>
            <View style={styles.tableColumn}>
              <Text style={styles.tableHeaderText}>วัน/เดือน/ปี</Text>
            </View>
            <View style={styles.tableColumn}>
              <Text style={styles.tableHeaderText}>ชื่อกิจกรรม</Text>
            </View>
            {/* <View style={styles.tableColumn}>
              <Text style={styles.tableHeaderText}>สติกเกอร์</Text>
            </View> */}
          </View>

          {item.length === 0 ? (
            <Text style={styles.noHistoryText}>ไม่มีประวัติกิจกรรม</Text>
          ) : (
            <FlatList
              data={item}
              renderItem={RenderMyItem}
              keyExtractor={(item) => item.event_id.toString()}
              refreshing={loading}
              onRefresh={() => setLoading(true)}
              style={{ marginBottom: 130 }}
            />
          )}
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#71dea9',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "#333",
    textAlign: 'center',
    marginBottom: 20,
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
  tableHeader: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#d3e9e0',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  tableColumn: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'left',
    marginLeft: 30,
  },
  tableHeaderText: {
    fontSize: 20,
    color: "#333",
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  itemLeft: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  itemMiddle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
    // borderRightWidth: 1,
    // borderRightColor: '#ddd',
  },
  itemRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginLeft: 10,
  },
  noHistoryText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
  },
});

export default History;
