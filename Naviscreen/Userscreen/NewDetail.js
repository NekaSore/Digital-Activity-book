import { Text, View, Image, ScrollView, Alert, ActivityIndicator, StyleSheet, RefreshControl, } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import axios from "axios"; // npm install axios

const NewDetail = ({ navigation, route }) => {
  const [item, setItem] = useState([]);
  const [loading, setloading] = useState(true);
  //console.log(route.params.id);

  useEffect(() => {
    fetch(`https://serverjs-api-6faec46c5c5a.herokuapp.com/new/${route.params.id}`)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setItem(result);
        setloading(false);
      });
  }, []);

  const [addUser, setAddUser] = useState({});
  const fetchUser = async () => {
    const accessToken = await AsyncStorage.getItem("@accessToken");
    const response = await fetch("https://maingo-api-c1bde2c6610c.herokuapp.com/users/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + accessToken },
    });
    const data = await response.json();
    if (data.status === "forbidden") {
      navigation.navigate("LoginP");
    }
    setAddUser(data.user);
    setloading(false);
    //console.log(addUser.User_id);
  };
  useEffect(() => {
    fetchUser();
  }, [loading]);

  // add user in event
  const addUserIn = () => {
    axios
      .post("https://serverjs-api-6faec46c5c5a.herokuapp.com/add-user", {
        user_id: addUser.User_id,
        event_id: route.params.id,
      })
      .then((response) => {
        if (response.data.success) {
          Alert.alert("บันทึกข้อมูลเรียบร้อย", response.data.message, [{ text: "ตกลง" }]);
          checkin();
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          Alert.alert("บันทึกข้อมูลไม่สำเร็จ", error.response.data.message, [{ text: "ตกลง" }]);
          checkin();
        } else {
          Alert.alert("บันทึกข้อมูลไม่สำเร็จ", "ระบบขัดข้อง กรุณาลองใหม่!", [{ text: "ตกลง" }]);
          checkin();
        }
      });
  };

  // check user join yet
  const [check, setCheck] = useState(true);
  const checkin = () => {
    axios
    .post("https://serverjs-api-6faec46c5c5a.herokuapp.com/check-user", {
      user_id: addUser.User_id,
      event_id: route.params.id,
    })
    .then((response) => {
      if (response.data.success) {
        setCheck(true);
      }
      else {
        setCheck(false);
      }
    })
    .catch((errot) => {
      console.error("Check-in error : ", error);
      setCheck(true);
    })
  };
  useEffect(() => {
    if (addUser.User_id) {
      checkin();
      //console.log(check);
    }
  },[addUser]);

  return (
    <View style={styles.container}>
      {loading ? (

        <View style={styles.loadingContainer} >
          <ActivityIndicator size="large" color="#323235" />
          <Text style={styles.loadingText}>กำลังโหลด รอสักครู่...</Text>
        </View>

      ) : (
        <ScrollView style={styles.contentContainer} refreshControl={<RefreshControl refreshing={loading} onRefresh={() => setloading(true)} />} >
          <View>
            <Text style={styles.title}>{item.event_name}</Text>
            {/* <Image
              source={{ uri: item.image }}
              style={styles.image}
            /> */}
            <View style={styles.detailsContainer}>
              <Text style={styles.sectionTitle}>รายละเอียด :</Text>
              <Text style={styles.detailText}>{item.event_descrip}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.sectionTitle}>วันที่ : <Text style={styles.dateText}>{item.event_date}</Text></Text>
              <Text style={styles.sectionTitle}>จำนวนตราปั๊ม : <Text style={styles.stampCount}>{item.event_point}</Text></Text>

              <Button
                icon="arrow-up-box"
                mode="contained"
                textColor="white"
                onPress={addUserIn}
                style={[styles.button, { opacity: check ? 0 : 1 }]}
                disabled={check === true}
              >
                ลงชื่อเข้าร่วมกิจกรรม
              </Button>
            </View>
          </View>
        </ScrollView>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#71dea9',
    paddingTop: 20,

  },
  contentContainer: {
    paddingHorizontal: 20,
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#333",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 10,
  },
  detailsContainer: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#333",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 18,
    color: "#555",
    lineHeight: 24,
  },
  dateText: {
    fontSize: 20,
    color: "#555",
    marginVertical: 10,
  },
  stampCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#555",
    marginVertical: 10,
  },
  button: {
    marginVertical: 15,
    marginBottom: 35,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#5cb85c",
  },
});

export default NewDetail;