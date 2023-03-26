import { View, TouchableOpacity, Text, Image, StyleSheet, SafeAreaView,ScrollView,ActivityIndicator} from "react-native";
import React, { useState, createContext, useContext, useEffect ,useLayoutEffect} from 'react';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import CustomButton from './Btn';
import { AntDesign } from '@expo/vector-icons';
const catImageUrl = "https://i.pravatar.cc/300";
import { auth, database } from '../config/firebase'
import { getAuth, signOut } from 'firebase/auth';
import {LineChart,BarChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {collection,addDoc,orderBy,query,onSnapshot,getDocs,docRef,getDoc,doc, QuerySnapshot} from 'firebase/firestore';
import { getDatabase, ref, runTransaction,onValue} from "firebase/database";





var data="";
const Monitor= () =>{
const [points,SetPoints]=useState([]);
const navigation = useNavigation();



// FINAL WORKING  FETCHING DATA FROM FIRESTORE

useEffect(() => {

  const collectionRef = collection(database, 'points');
  const q = query(collectionRef, orderBy('time', 'desc'));

const unsubscribe = onSnapshot(q, querySnapshot => {
  console.log('querySnapshot unsusbscribe');
    SetPoints(
      querySnapshot.docs.map(doc => ({
        p: doc.data().p,
        time:doc.data().time
      }))
    );
  });
return unsubscribe;
}, []);

//console.log(points.map(value=>value.time));



    const screenWidth = Dimensions.get("window").width;
    console.log(screenWidth);
    if (points?.length === 0) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#1C64D1" />
     </View>
      );
    }
    return(
    <ScrollView>
      <View style={{padding:10}}>
      <TouchableOpacity onPress={() => navigation.navigate("UltraSonic")} style={{flexDirection:"row"}}>
      <Text style={{fontSize: 20,fontWeight : "bold",marginLeft: 5, marginTop: 5,marginBottom :5 ,color:colors.primary}}>UltraSonic Sensor</Text>
      <Text style={{color:colors.primary,marginLeft: 50, marginTop: 13,marginBottom :5,fontSize: 12}}>View Readings</Text>
      </TouchableOpacity>
        <ScrollView horizontal={true}>  
        <LineChart
          data={{
            labels: points.map(value=>value.time),
            datasets: [
              {
                data: points.map(value=>value.p),
              },
            ],
          }}
          
          width={(screenWidth*points.length)/7} // from react-native
          height={250}
          
          yAxisSuffix="cm"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: colors.primary,
            backgroundGradientTo: colors.primary,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 10,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#fff",
            },
          }}
          bezier
          style={{
            marginVertical: 10,
            borderRadius: 10,
          }}
        />
        </ScrollView>

         <TouchableOpacity style={{flexDirection:"row"}}>
         <Text style={{fontSize: 20,fontWeight : "bold",marginLeft: 5, marginTop: 5,marginBottom :5 ,color:colors.primary}}>Gas Sensor</Text>
         <Text style={{color:colors.primary,marginLeft: 120, marginTop: 13,marginBottom :5,fontSize: 12}}>View Readings</Text>
         </TouchableOpacity>  
         <ScrollView horizontal={true}>  

      <LineChart
          data={{
            labels: points.map(value=>value.time),
            datasets: [
              {
                data: points.map(value=>value.p),
              },
            ],
          }}
          
          width={(screenWidth*points.length)/7} // from react-native
          height={250}
          yLabelsOffset={3}
          yAxisSuffix="ppm"
          yAxisInterval={10} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: colors.primary,
            backgroundGradientTo: colors.primary,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#fff",
            },
          }}
          bezier
          style={{
            marginVertical: 10,
            borderRadius: 10,
          }}
        />
      </ScrollView>
      </View>
    </ScrollView>

);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
export default Monitor;

// useLayoutEffect(() => {
//   fetch('https://spydrain-demo-default-rtdb.asia-southeast1.firebasedatabase.app/test.json', {
//     method: 'GET'
//     //Request Type 
// })
//   .then((response) => response.json())
// //If response is in json then in success
//   .then((responseJson) => {
//     const dataa=responseJson
//     for( let val in dataa){
//       SetPoints(dataa[val]);
//     }
    
    
// })
// //If response is not in json then in error
// .catch((error) => {
//     //Error 
//     console.error(error);
// });
// }, []);


//console.log(points)

// getDoc(doc(database,'points','JYcERp7tiIFUEw74x3qu')).then(docSnap => {
//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//     console.log(auth.currentUser.email);
//   }
// })

// ONE DOCUMENT getDOC

// const q =collection(database, "points");
// const querySnapshot = getDocs(q);
// if(querySnapshot){
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
  

// getDocs(collection(database, "points")).then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//   });
// });


// const getData = () => {
//   ref(database, 'points/').on('value', snapshot => {
//       let responselist = Object.values(snapshot.val())
//       setData(responselist)
//       console.log(snapshot.val())
//       setLoading(true);
//   });
//   }


// const db = getDatabase();
// const starCountRef = ref(db, 'test/'+'-NK8u51-29N23nkekK_K');
// console.log(starCountRef);
// onValue(starCountRef, (snapshot) => {
//   const data11 = snapshot.val();
//   console.log(data11);
// });
// //const db = getDatabase();
// const auth = getAuth();

// const userId = auth.currentUser.uid;
// return onValue(ref(db, '/users/' + userId), (snapshot) => {
//   const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   console.log(username);
// }, {
//   onlyOnce: true
// });