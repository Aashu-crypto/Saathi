import "./gesture-handler";
import * as Linking from "expo-linking";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Provider, useDispatch } from "react-redux";
import { store } from "./Redux/Store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootStack from "./navigation/RootStack";
import { PaperProvider } from "react-native-paper";

const prefix = Linking.createURL("/");
export default function App() {
  const [loaded, error] = useFonts({
    "Dream-Orphans": require("./assets/fonts/Dream_Orphans.otf"),
    "Dream-Orphans-bd": require("./assets/fonts/Dream_Orphans_Bd.otf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });
  if (!loaded && !error) {
    return null;
  }
  const linking = {
    prefixes: [prefix,'https://saathi.etheriumtech.com/'],
  };
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
          <NavigationContainer linking={linking}>
            <RootStack />
          </NavigationContainer>
        </PaperProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
