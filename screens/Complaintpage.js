import React, { useEffect,useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, SafeAreaView,TextInput,Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
//import { TextInput } from "react-native-web";
import { auth, database } from '../config/firebase';
import {collection,addDoc,orderBy,query,onSnapshot} from 'firebase/firestore';
//import { Button } from "react-native-web";
const catImageUrl = "https://i.pravatar.cc/300";

const Complaintpage = () => {

    const navigation = useNavigation();
    const [name,setName ] =useState();
    const [email,setEmail ] =useState();
    const [message,setMessage] =useState();
    
    const userCollectionRef = collection(database,'contactdata') 
    const handleSubmit = ()=>{
        addDoc(userCollectionRef,{
            name : name || null,
            email :email || null ,
            message: message 

        });
    }
    
    useEffect(() => {
        navigation.setOptions({
            
            headerRight: () => (
                <FontAwesome name="user" size={24} color={'#1C64D1'} style={{marginRight: 25}}/>
            ),
        });
    }, [navigation]);

    
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.form}>
          <Text style={styles.heading}>Complaint Form</Text>
          <Text style={{ marginLeft: 15, marginTop: 20 }}>Name</Text>
          <TextInput style={styles.input} onChange={(event)=>{
            setName(event.target.value)
          }} />

          <Text style={{ marginLeft: 15, marginTop: 20 }}>Address</Text>
          <TextInput style={styles.input} onChange={(event)=>{
            setEmail(event.target.value)
          }} />

          <Text style={{ marginLeft: 15, marginTop: 20 }}>Problem</Text>
          <TextInput style={styles.input} onChange={(event)=>{
            setMessage(event.target.value)
          }}/>

        <Button title="Submit Complaint" onPress={handleSubmit} color={colors.primary} style={styles.button}/>
        </SafeAreaView>

      </View>
    );
    };

    export default Complaintpage;
    

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#fff",
            flexDirection:"column",
          },
        container1: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: "#fff",
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
            width:"90%",
            height: "100%",
            backgroundColor : "#fff",
            marginLeft : 20,
        },
        heading:{
            textAlign:"center",
            fontSize:25, 
            marginTop:20, 
            fontWeight:"bold" , 
            color:colors.primary,
        },
        button: {
            backgroundColor: colors.primary,
            borderRadius: 70,
            alignItems: 'center',
            justifyContent: 'center',
            //shadowColor: colors.primary,
      
        }
    });

    // <View style={styles.container1}>
    // <TouchableOpacity
    //     onPress={() => navigation.navigate("Chat")}
    //     style={styles.chatButton}
    // >
    //     <Entypo name="chat" size={24} color={colors.lightGray} />
    // </TouchableOpacity>
    // </View>