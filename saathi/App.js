import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Provider, useDispatch } from "react-redux";
import { store } from "./Redux/Store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootStack from "./navigation/RootStack";
export default function App() {
  const [loaded, error] = useFonts({
    "Dream-Orphans": require("./assets/fonts/Dream_Orphans.otf"),
    "Dream-Orphans-bd": require("./assets/fonts/Dream_Orphans_Bd.otf"),
  });
  if (!loaded && !error) {
    return null;
  }
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}
