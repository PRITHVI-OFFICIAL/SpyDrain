import React from 'react';
import {Text, TouchableOpacity, StyleSheet,View} from 'react-native';
import colors from '../colors';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

const CustomButton = ({
  title,icon,press,

}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={press}>
      <View
        style={{
          backgroundColor: colors.primary,
          width: 150,
          height: 150,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
          padding: 15,
          
        }}
      >
        <FontAwesome name={icon} size={30} color={"white"} style={{ marginLeft: 15, marginRight: 10,marginBottom:10 }}/>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "800" }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: '#512DA8',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
});