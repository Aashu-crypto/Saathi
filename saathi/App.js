import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./navigation/tab/BottomTab";
import LoginStack from "./navigation/stack/LoginStack";

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
