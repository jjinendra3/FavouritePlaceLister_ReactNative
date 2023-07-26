import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { fetcher, particular } from "../database";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const focus = useIsFocused();
  const [places, setplaces] = useState();
  useEffect(() => {
    async function setter() {
      const placer = await fetcher();
      setplaces(placer);
    }
    setter();
  }, [focus]);

  if (!places) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          No Items to Show! Add Places to view them!
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        renderItem={(elements) => {
          return (
            <Pressable
              onPress={async () => {
                const obj = await particular(elements.item.id);
                navigation.navigate("Details", { obj });
              }}
            >
              <View style={styles.item}>
                <Image
                  source={{ uri: elements.item.img }}
                  style={{ height: 100, width: 100, borderRadius: 4 }}
                />
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 5,
                    marginHorizontal: 5,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      marginHorizontal: 5,
                    }}
                  >
                    {elements.item.title}
                  </Text>
                  <Text style={{ fontSize: 10 }}>{elements.item.address}</Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    borderRadius: 6,
    marginVertical: 12,
    elevation: 2,
    flex: 1,
    padding: 10,
  },
  pressed: {
    opacity: 0.9,
  },
});
