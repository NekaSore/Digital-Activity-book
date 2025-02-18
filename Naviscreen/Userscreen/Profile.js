import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, } from 'react'
import { Button } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar';
import QRCode from 'react-native-qrcode-svg'; // npm i -S react-native-svg react-native-qrcode-svg

const Profile = ({ navigation }) => {
  const [user, setuser] = useState({})
  const [loading, setloading] = useState(true)
  const fetchUser = async () => {
    const accessToken = await AsyncStorage.getItem("@accessToken")
    const response = await fetch("https://maingo-api-c1bde2c6610c.herokuapp.com/users/profile", {
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
    fetchUser();

  }, [navigation, loading]);

  const Logout = async () => {
    // await AsyncStorage.removeItem("@accessToken");
    // navigation.navigate("P_Login")
    try {
      await AsyncStorage.removeItem("@accessToken");
      // const token = await AsyncStorage.getItem("@accessToken");
      // if (!token) {
      //   console.log("Token removed successfully");
      // }
      navigation.reset({
        index: 0,
        routes: [{ name: "P_Login" }],
      });
    } catch (error) {
      console.error("Error clearing token:", error);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#71dea9' }}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#323235" />
          <Text style={styles.loadingText}>กำลังโหลด รอสักครู่...</Text>
        </View>
      ) : (
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={() => setloading(true)} />} >
          <View style={styles.container}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user.Avatar }}
                style={styles.avatar}
              />
            </View>

            <View style={styles.profileDetailsContainer}>
              <Text style={styles.profileText}>ชื่อ : {user.Fullname}</Text>
              <Text style={styles.profileText}>สาขาวิชา : {user.Department}</Text>
              <Text style={styles.profileText}>รหัสนักศึกษา : {user.Username}</Text>
              <Text style={styles.profileText}>ตราปั๊มทั้งหมด : {user.Points}</Text>
            </View>

            <TouchableOpacity onPress={fetchUser} activeOpacity={0.7} style={styles.QRpic}>
              <QRCode
                value={user.Username}
                size={200}
                logo={require('./../../stuff/ytc.png')}
                logoSize={30}
              />
            </TouchableOpacity>

            <Button
              icon="logout"
              mode="contained"
              textColor="white"
              style={styles.logoutButton}
              onPress={Logout}
            >
              ออกจากระบบ
            </Button>

            <StatusBar style="auto" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#71dea9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileDetailsContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  profileText: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  QRpic: {
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutButton: {
    width: '100%',
    paddingVertical: 10,
    marginVertical: 20,
    backgroundColor: '#e57373',
    borderRadius: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#71dea9',
  },
});

export default Profile;