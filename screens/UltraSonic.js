import React, { useState,useLayoutEffect} from 'react';
import { View, StyleSheet, Button, Platform, Text,TouchableOpacity,FlatList } from 'react-native';
import {collection,orderBy,query,onSnapshot,where} from 'firebase/firestore';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import {database } from '../config/firebase'
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const UltraSonic= () =>{

  const [points,SetPoints]=useState([]);
  const [readingcount,setReadingCount]=useState(0);
  const [high,SetHigh]=useState([]);
  const [good,SetGood]=useState(0);

  useLayoutEffect(() => {

    const collectionRef = collection(database, 'points');
    const q = query(collectionRef, orderBy('time', 'desc'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      SetPoints(
        querySnapshot.docs.map(doc => 
          (
          {
          p: doc.data().p,
          time:doc.data().time 
        }))
      ),
      setReadingCount(querySnapshot.size)
    });
  
  return unsubscribe;
  }, 
  
  []); 

  useLayoutEffect(() => {

    const collectionRef = collection(database, 'points');
    const q = query(collectionRef, where("p", ">=", "50"));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      SetHigh(querySnapshot.size)
    });
  }, []);



console.log(high);

 
  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
     html : createDynamicTable(),
    });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }



 
  const array= points

  const createDynamicTable = () => {

  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  var CurrentTime = date + '/' + month + '/' + year+ ' ' + hours + ':' + min + ':' + sec;
 

    var table = '';
    var count=1;
    for (let i in array) {
      const item = array[i];
      table = table + `
      <tr>
         <td>${count}</td>
        <td>${item.time}</td>
        <td>${item.p}</td>
      </tr>
      `
      count+=1
    }
    //console.log(table);
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
      <style>
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        
        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 5px;
        }
        
        tr:nth-child(even) {
          background-color: #dddddd;
        }
      </style>
      </head>
      <body>
      <p>${CurrentTime}</p>
      <h2>SPYDRAIN REPORT</h2>
      
      <table>
        <tr>
          <th>S.No</th>
          <th>Time</th>
          <th>Distance</th>
        </tr>
        ${table}
      </table>
      
      </body>
    </html>
      `;
    return html;
  }
  
  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);



  return (
    <View style={styles.container}>
       <Text style={{fontSize: 25,fontWeight: "bold",textAlign: "center",color: colors.primary,}}>SPYDRAIN REPORT</Text>
       <Text style={{fontSize: 15,textAlign: "center",color:"black",}}>Ultrasonic Sensor Readings</Text>
       {/* <Button title='Print to PDF file' onPress={printToFile} /> */}
       
       <View style={{flexDirection:"row",marginTop:20, justifyContent:"center",marginRight:12}}>
       <Text style={{marginRight: 35,textAlign:"center"}}>Count</Text>
       <Text style={{marginLeft:30,textAlign:"center",color:"green"}}>Good</Text>
       <Text style={{marginLeft:60,textAlign:"center",color:"red"}}>Risk</Text>
       </View>

       <View style={{flexDirection : "row",justifyContent:"center",marginRight:25}}>
       <View style={{backgroundColor:"#1C64D1",width : 80 ,height : 80 ,marginLeft:20,borderRadius:10,marginTop:10}}>
       <Text style={{marginTop: 19,textAlign:"center",fontWeight:"bold",fontSize:30,color:"white"}} >{readingcount}</Text>
       </View>

       <View style={{backgroundColor:"green",width : 80 ,height : 80 ,marginLeft:20,borderRadius:10,marginTop:10}}>
       <Text style={{marginTop: 19,textAlign:"center",fontWeight:"bold",fontSize:30,color:"white"}} >{readingcount-high}</Text>
       </View>

       <View style={{backgroundColor:"red",width : 80 ,height : 80 ,marginLeft:20,borderRadius:10,marginTop:10}}>
       <Text style={{marginTop: 19,textAlign:"center",fontWeight:"bold",fontSize:30,color:"white"}} >{high}</Text>
       </View>
       </View>

       <TouchableOpacity onPress={printToFile} style={{width:50,marginLeft:"51%"}}>
        <View style={styles.printbutton}>
          <FontAwesome
            name="download"
            size={22}
            color={"white"}
            style={{ marginRight: 10, justifyContent: "center" }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 13,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Download
          </Text>
        </View>
       </TouchableOpacity>
       



      <SafeAreaView style={{justifyContent:"center"}}>
      <ScrollView>
        <DataTable>
          <DataTable.Header style={{marginLeft:35}} >
            <DataTable.Title>Time</DataTable.Title>
            <DataTable.Title >Distance</DataTable.Title>
            <DataTable.Title style={{marginLeft:20}}>Status</DataTable.Title>
          </DataTable.Header>
          {points.map((items,index) => {
            return(
            <DataTable.Row styles={{padding:30}} key={index}>
              <DataTable.Cell textStyle={{marginLeft:30}}>{items.time}</DataTable.Cell>
              <DataTable.Cell textStyle={[styles.pad,parseInt(items.p) > 60 ? styles.green : styles.red]}>{items.p}</DataTable.Cell>
              <DataTable.Cell textStyle={{marginLeft:30}}><FontAwesome name="circle" size={20} color={ parseInt(items.p)>60 ? "green" : "red"}  /></DataTable.Cell>
            </DataTable.Row>)
           
          }
            
          )}
      
        </DataTable>
        </ScrollView>
      </SafeAreaView>
      </View>
  );
  
}
export default UltraSonic;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    //backgroundColor:"yellow",
  },
  printbutton:{
    backgroundColor: colors.primary,
    width: 130,
    height: 40,
    borderRadius:15,
    justifyContent: "center",
    alignItems:"center",
    flexDirection:"row",
    marginTop:40,
    marginLeft:"60%"
  },
  red:{
    color:"red",
  },
  green:{
    color:"green",
  },
  pad:{marginLeft:30,alignItems: "center",alignItems:"center"},

  space:{ marginRight : 20,justifyContent:"center",alignItems:"center",textAlign:"center"},
})