import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // npm install @react-navigation/bottom-tabs
import { Ionicons } from 'react-native-vector-icons';
const Tab = createBottomTabNavigator();

import P_Profile from "./Userscreen/Profile"
import P_New from "./Userscreen/New"
import P_History from "./Userscreen/History"

const Navi = () => {
    
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: '#FFFFFF', // Active tab color
      tabBarInactiveTintColor: 'gray', // Inactive tab color
      tabBarStyle: {
        backgroundColor: '#323235', // Tab bar background color
      },
    }}>
        <Tab.Screen name="P_Profile" component={P_Profile} options={{ title : "Profile" , headerStyle: { backgroundColor: '#323235' }, headerTintColor: '#ffffff', tabBarIcon: ({ color, size }) => ( <Ionicons name="person" size={size} color={color} /> ),  }}/>
        <Tab.Screen name="P_History" component={P_History} options={{ title : "Sticker" , headerStyle: { backgroundColor: '#323235' }, headerTintColor: '#ffffff', tabBarIcon: ({ color, size }) => ( <Ionicons name="book"   size={size} color={color} /> ),  }}/>
        <Tab.Screen name="P_New"     component={P_New}     options={{ title : "Activity", headerStyle: { backgroundColor: '#323235' }, headerTintColor: '#ffffff', tabBarIcon: ({ color, size }) => ( <Ionicons name="list"   size={size} color={color} /> ),  }} />
        
    </Tab.Navigator>
  )
}

export default Navi


