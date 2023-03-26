import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, SafeAreaView,ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import CustomButton from './Btn';
//import { TextInput } from "react-native-web";
const catImageUrl = "https://i.pravatar.cc/300";
import { auth, database } from '../config/firebase'
import { signOut } from 'firebase/auth';

const Home = () => {

    const navigation = useNavigation();
    //const [text, onChangeText] = React.useState("Enter Your Name");

    
    
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="home" size={25} color={'#1C64D1'} style={{marginLeft: 15}}/>
            ),
            headerRight: () => (
                <TouchableOpacity
                  style={{
                    marginRight: 10
                  }}
                  onPress={() => navigation.navigate('Userprofile')}
                >
                  <FontAwesome name="user" size={25} color={'#1C64D1'} style={{marginRight: 10}}/>
                </TouchableOpacity>
              )
            
        });
    }, [navigation]);

    return (
        
      <View style={styles.container}>
        <SafeAreaView style={styles.form}>
          <Text style={styles.heading}>Home</Text>
        </SafeAreaView >
        <View style={{flexDirection: 'row', justifyContent:"space-around" , marginBottom:25 ,textAlign:"center"}}>
        <CustomButton title="Drainage Monitor" icon="gear" press={() => navigation.navigate('Monitor')}/>
        <CustomButton  title="GroupChat" icon="group" press={() => navigation.navigate('Chat')}/>
        </View>

        <View style={{flexDirection: 'row', justifyContent:"space-around",marginBottom:25}}>
        <CustomButton  title="Complaint   Forum" icon="wechat" press={() => navigation.navigate('Complaintpage')}/>
        <CustomButton title="Employee Details" icon="user"/>
        </View>

        <View style={{flexDirection: 'row', justifyContent:"space-around",marginBottom:25}}>
        <CustomButton title="Attendance" icon="address-book"/>
        <CustomButton title="Health" icon= "plus"/>
        </View>
      </View>
    );
    };
    export default Home;
    
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#fff",
            //flexDirection:"column",            
           
            padding: 10,
          },
        container1: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: "#white",
            
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderColor: colors.primary,
            placeholder:"Enter the Details",
            borderRadius: 10,
          },
        form :{
            textAlign: "center",
            justifyContent: "space-around",
            //flexDirection:"column", 
        },
        heading:{
            fontSize:20, 
            marginTop:10,
            marginBottom:20,
            marginLeft:15, 
            fontWeight:"bold" , 
            color:colors.primary,
        },
        chatButton: {
            backgroundColor: colors.primary,
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.primary,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 20,
            marginBottom: 50,
        }
    });