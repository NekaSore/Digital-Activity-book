import { NavigationContainer } from "@react-navigation/native"; //npm install @react-navigation/native
import { createNativeStackNavigator } from "@react-navigation/native-stack"; //npm install @react-navigation/native-stack
const Stack = createNativeStackNavigator();

import P_Start from "./StartScreen/Start"
import P_Login from "./StartScreen/Login"
import P_Navi from "./NaviScreen/Navi"
import P_Detail from "./NaviScreen/Userscreen/NewDetail"

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="P_Start" component={P_Start} options={{ headerShown : false }} />
        <Stack.Screen name="P_Login" component={P_Login} options={{ headerShown : false }} />
        <Stack.Screen name="P_Navi" component={P_Navi} options={{ headerShown : false }} />
        <Stack.Screen name="P_Detail" component={P_Detail} options={{ title : "Back", headerStyle: { backgroundColor: '#323235' }, headerTintColor: '#ffffff', }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


