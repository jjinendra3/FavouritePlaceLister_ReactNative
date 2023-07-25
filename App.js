import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Map from "./screens/Map";
import Adder from "./screens/Adder";
import Details from "./screens/Details";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { init } from "./database";
const Stack = createNativeStackNavigator();
export default function App() {
  useEffect(() => {
    init();
  }, []);
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#D2E9E9" },
          headerTintColor: "black",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={({ navigation }) => ({
            headerRight: () => {
              return (
                <Ionicons
                  name="add-circle"
                  onPress={() => {
                    navigation.navigate("AddPlace");
                  }}
                  size={32}
                  color="white"
                  style={{ marginRight: 5, marginTop: 5 }}
                />
              );
            },
          })}
        />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen component={Adder} name="AddPlace" />
        <Stack.Screen component={Map} name="Map" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
