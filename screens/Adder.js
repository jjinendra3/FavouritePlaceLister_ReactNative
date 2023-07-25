import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import LocationPick from "../component/LocationPick";
import ImagePicker from "../component/ImagePicker";
import { adder } from "../database";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
const API_KEY='';
const Adder = ({ navigation }) => {
  const [first, setfirst] = useState("");
  const [img, setimg] = useState();
  const [location, setlocation] = useState();
  const saver = () => {
    if (!location || !first || !img) {
      Alert.alert("Incomplete Form", "Please Fill all the details to submit.");
    }
    let address = "No Address found!";
    if (location) {
      const { long, lat } = location;
      fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${API_KEY}`
      )
        .then((response) => response.json())
        .then((result) => {
          address = result.features[0].properties.formatted;
          adder(
            uuidv4(),
            first,
            img,
            address,
            location.lat,
            location.long
          ).then(() => {
            navigation.navigate("HomeScreen");
            setfirst("");
            setimg();
            setlocation();
          });
        })
        .catch((err) => {
          Alert.alert(
            "Error!",
            "Uh-Oh! Something went wrong! Please clear storage and cache and try again!"
          );
        });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput value={first} onChangeText={setfirst} style={styles.title} />
      <ImagePicker setimg={setimg} />
      <LocationPick setlocation={setlocation} />
      <View style={{ marginTop: 20 }}>
        <Button title="Add Place" onPress={saver} />
      </View>
    </View>
  );
};

export default Adder;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontWeight: "500",
    fontSize: 12,
    marginLeft: 10,
  },
  title: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "black",
    padding: 5,
    paddingHorizontal: 10,
  },
});
