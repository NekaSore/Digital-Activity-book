import { StyleSheet } from "react-native";

export const sty = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login_con:{
    width: "100%",
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: '#71dea9',
  },
  login_img:{
    alignSelf: "center",
    paddingBottom: 150,
  },
  login_logo:{
    width: 250, 
    height: 250,
  },
  login_IP:{
    paddingBottom : 5,
    color : "#FFF",
    alignSelf: "center",
    width: "80%"
  },
  login_BT:{
    paddingVertical : 25,
    alignSelf: "center",
    width: "80%"
  },
  st_con:{
    height : "100%", 
    alignItems: "center", 
    backgroundColor: '#71dea9',
  },
  Pro_img : {
    alignSelf: "center",
  },
  NewCon : {
    alignSelf: "center",
    padding: 20,
    borderWidth : 1,
    borderRadius: 20,
    marginVertical: 10,
    width: "90%"
  },
});
