import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Alert, Button } from "react-native";
const Map = ({ navigation }) => {
  const [first, setfirst] = useState();
  useEffect(() => {
    function navigator() {
      if (!first) {
        Alert.alert("Select Location", "Please Select a location to go back!");
        return;
      }
      navigation.navigate("AddPlace", { coords: first });
    }
    navigation.setOptions({
      headerRight: () => {
        return <Button title="Select" onPress={navigator} />;
      },
    });
  }, [navigation, first]);

  const region = {
    latitude: 28.535517,
    longitude: 77.391029,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <MapView
      initialRegion={region}
      style={{ flex: 1 }}
      onPress={(event) => {
        setfirst({
          lat: event.nativeEvent.coordinate.latitude,
          long: event.nativeEvent.coordinate.longitude,
        });
      }}
    >
      {first && (
        <Marker
          title={"Picked Location"}
          coordinate={{ latitude: first.lat, longitude: first.long }}
        />
      )}
    </MapView>
  );
};

export default Map;
