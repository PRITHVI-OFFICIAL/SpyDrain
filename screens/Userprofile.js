import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,Button,TouchableOpacity} from 'react-native';
import { getAuth} from "firebase/auth";
import colors from '../colors';
import { Dimensions } from "react-native";
import { auth, database } from '../config/firebase'
import { signOut } from 'firebase/auth';
import { FontAwesome } from '@expo/vector-icons';
//import { TouchableOpacity } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get("window").width;
const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
const Userprofile = () =>  {
    
   {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
              }}
            />

            <Text style={styles.name}>Prithvi</Text>
            <Text style={styles.userInfo}>{getAuth().currentUser.email}</Text>
            {/* <Text style={styles.userInfo}>Chennai Corporation</Text> */}

    <TouchableOpacity >
      <View
        style={{
          backgroundColor: colors.primary,
          width: 120,
          height: 30,
          borderRadius:15,
          justifyContent: "center",
          alignItems:"center",
          flexDirection:"row",
          marginTop:10,
        }}
      >
        <FontAwesome name="pencil" size={22} color={"white"} style={{marginRight:10,justifyContent:"center"}}/>
        <Text style={{ color: "white", fontSize: 13, justifyContent:"center",alignItems:"center",}}>Edit Profile</Text>
      </View>
    </TouchableOpacity>
          </View>
        </View>


    <View style={styles.body}>

        <View style={{ width: "80%",height:100,backgroundColor:"#fff",marginLeft: 30}}>
        <Text style={{color: "#5e5e5e" ,fontSize:13,marginBottom:5,backgroundColor:colors.lightGray,}}>P R O F I L E</Text>

        <TouchableOpacity style={{borderColor:"blue",borderColor:"green", marginTop:10}}>
      <View
        style={{backgroundColor: "white",width: "100%",height:50,borderColor: "black",flexDirection:"row",}}>
        <FontAwesome name="gear" size={25} color={"#5e5e5e"} style={{marginLeft: 10,marginTop:10}}/> 
        <Text style={{ color: "#5e5e5e", fontSize: 16,marginLeft:10 ,marginTop:10}}>Settings</Text>
      </View>
    </TouchableOpacity>

    
    <TouchableOpacity style={{borderColor:"blue",borderColor:"green", marginTop:10}}>
      <View
        style={{backgroundColor: "white",width: "100%",height:50,borderColor: "black",flexDirection:"row",}}>
        <FontAwesome name="legal" size={25} color={"#5e5e5e"} style={{marginLeft: 10,marginTop:10}}/> 
        <Text style={{ color: "#5e5e5e", fontSize: 16,marginLeft:10 ,marginTop:10}}>Legal Information</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity style={{borderColor:"blue",borderColor:"green", marginTop:10}}>
      <View
        style={{backgroundColor: "white",width: "100%",height:50,borderColor: "black",flexDirection:"row",}}>
        <FontAwesome name="phone" size={25} color={"#5e5e5e"} style={{marginLeft: 10,marginTop:10}}/> 
        <Text style={{ color: "#5e5e5e", fontSize: 16,marginLeft:10 ,marginTop:10}}>Contact Us</Text>
      </View>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={onSignOut}>
      <View
        style={{
          backgroundColor: colors.primary,
          width: 120,
          height: 40,
          borderRadius:15,
          justifyContent: "center",
          alignItems:"center",
          flexDirection:"row",
          marginTop:40,
          marginLeft:"30%",
        }}
      >
        <FontAwesome name="sign-out" size={22} color={"white"} style={{marginRight:10,justifyContent:"center"}}/>
        <Text style={{ color: "white", fontSize: 13, justifyContent:"center",alignItems:"center",}}>LogOut</Text>
      </View>
      <Text style={{color: "#5e5e5e" ,fontSize:13,marginTop:5,textAlign:"center"}}>Do you want to Signout?</Text>
    </TouchableOpacity>

        </View>
        </View>
      </View>
    );
  }
}
export default Userprofile;
const styles = StyleSheet.create({
  header:{
    backgroundColor: '#fff',
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#000",
    fontWeight:'400',
    marginTop: 5,

  },
  userInfo:{
    fontSize:16,
    color:"#5e5e5e",
    fontWeight:'600',
  },
  body:{
    backgroundColor: "#fff",
    height:500,
    //alignItems:'center',

  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
  },
  logout:{
   backgroundColor: "#fff",
   width: 100 ,
   height: 50,
   alignItems: "center",
   justifyContent: "center",
   marginTop: 60, 
   backgroundColor: colors.primary, 
   borderColor: "black",
   borderRadius: 10,
}
});


{/* <TouchableOpacity>
<View
  style={{backgroundColor: "#fff",width: screenWidth,height: 50,alignItems: "center",justifyContent: "center",marginTop: 20, borderColor: "black",}}>
  <Text style={{ color: "black", fontSize: 16,}}>Settings</Text>
</View>
</TouchableOpacity>

<TouchableOpacity>
<View
  style={{backgroundColor: "#fff",width: screenWidth,height: 50,alignItems: "center",justifyContent: "center",marginTop: 20, borderColor: "black",}}>
  <Text style={{ color: "black", fontSize: 16,}}>Version Info</Text>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={onSignOut}>
<View
  style={styles.logout}>
  <Text style={{ color: "white", fontSize: 16,}}>LogOut</Text>
</View>
</TouchableOpacity> */}