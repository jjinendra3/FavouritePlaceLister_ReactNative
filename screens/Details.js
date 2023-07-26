import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import React, { useEffect } from "react";

const Details = ({ route, navigation }) => {
  const { address, id, img, lat, long, title } = route.params.obj[0];
  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, []);

  return (
    <ScrollView>
      <View>
        <Image style={styles.img} source={{ uri: img }} />
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            padding: 10,
            fontSize: 24,
          }}
        >
          {title}
        </Text>
        <View style={styles.location}>
          <Text style={{ textAlign: "center", fontWeight: "bold", padding: 5 }}>
            {address}
          </Text>
        </View>
        <Button
          title="View on Map"
          onPress={() => {
            navigation.navigate("Map", { long, lat });
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Details;
const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    flex: 1,
    marginTop: 20,
  },
  img: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  location: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
