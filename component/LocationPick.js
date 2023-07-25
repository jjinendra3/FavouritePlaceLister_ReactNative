import { View, Button, StyleSheet, Alert, Image, Text } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
const API_KEY='';
const url = (coord) => {
  if (coord) {
    const { long, lat } = coord;
    return `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat%3A${long}%2C${lat}&zoom=14.3497&marker=lonlat%3A${long}%2C${lat}%3Btype%3Aawesome&apiKey=${API_KEY}`;
  }
};
const LocationPick = ({ setlocation }) => {
  const router = useRoute();
  const [coord, setcoord] = useState();
  useEffect(() => {
    if (router.params) {
      setcoord({
        long: router.params.coords.long,
        lat: router.params.coords.lat,
      });
      setlocation({
        long: router.params.coords.long,
        lat: router.params.coords.lat,
      });
    }
  }, [router.params]);
  const nav = useNavigation();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  async function verifypermission() {
    if (locationPermissionInformation === PermissionStatus.UNDETERMINED) {
      const permissionres = await requestPermission();
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
    if (!haspermission) {
      return;
    }
    try {
      const location = await getCurrentPositionAsync({ accuracy: 6 });
      setcoord({
        long: location.coords.longitude,
        lat: location.coords.latitude,
      });
      setlocation({
        long: location.coords.longitude,
        lat: location.coords.latitude,
      });
    } catch (err) {
      Alert.alert(
        "Device Incomptibility",
        "Your Device is incompatible to get live location. Please select location from map."
      );
      return;
    }
  };
  const pickonmap = () => {
    nav.navigate("Map");
  };
  return (
    <View>
      <View style={styles.preview}>
        {coord ? (
          <Image
            source={{ uri: url(coord) }}
            style={{ height: "100%", width: "100%", borderRadius: 4 }}
          />
        ) : (
          <Text>Select Location!</Text>
        )}
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
    backgroundColor: "#D4E2D4",
    borderRadius: 4,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
