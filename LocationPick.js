import { View, Button, StyleSheet, Alert, Image, Text } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
const url = (coord) => {
  const { long, lat } = coord;
  console.log(coord);
  if (coord) {
    return `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat%3A${long}%2C${lat}&zoom=14.3497&marker=lonlat%3A${long}%2C${lat}%3Btype%3Aawesome&apiKey=${YOUR_API_KEY}`;
  }
};
const LocationPick = (props) => {
  const nav = useNavigation();
  const [coord, setcoord] = useState({
    long: "",
    lat: "",
  });
  const [maplink, setmaplink] = useState(false);
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  async function verifypermission() {
    if (locationPermissionInformation === PermissionStatus.UNDETERMINED) {
      const permissionres = await requestPermission();
      console.log(permissionres);
      return permissionres.granted;
    }
    if (locationPermissionInformation === PermissionStatus.DENIED) {
      Alert.alert(
        "Location Permissions",
        "Please grant Location Permissions to run the app."
      );
      return false;
    }
    return true;
  }
  const getlocation = async () => {
    const haspermission = await verifypermission();
    console.log(haspermission);
    if (!haspermission) {
      return;
    }
    const location = await getCurrentPositionAsync({ accuracy: 6 });
    console.log(location);
    setcoord({
      long: location.coords.longitude,
      lat: location.coords.latitude,
    });
    setmaplink(true);
  };
  const pickonmap = () => {
    nav.navigate("Map");
    setmaplink(true);
  };
  return (
    <View>
      <View style={styles.preview}>
        <Image
          source={!props ? { uri: url(coord) } : { uri: url(props.coords) }}
          style={{ height: "100%", width: "100%", borderRadius: 4 }}
        />
      </View>
      <View style={styles.action}>
        <Button title="Locate User" onPress={getlocation} />
        <Button title="Pick On Map" onPress={pickonmap} />
      </View>
    </View>
  );
};

export default LocationPick;
const styles = StyleSheet.create({
  preview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "aqaublue",
    borderRadius: 4,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
