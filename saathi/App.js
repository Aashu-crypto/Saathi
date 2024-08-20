import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { Provider, useDispatch } from "react-redux";
import { store } from "./Redux/Store";
import RootStack from "./navigation/RootStack";
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}
