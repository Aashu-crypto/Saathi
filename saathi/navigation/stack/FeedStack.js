import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import Feed from "../../screens/feed/Feed";
import { Route } from "../../routes";
import { Color } from "../../GlobalStyles";
const FeedStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Route.FEED}
        component={Feed}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: "Saathi",
          headerTitleStyle: {
            fontFamily: "Dream-Orphans-bd",
            color: Color.appDefaultColor,
            letterSpacing: 2,
            fontSize: 25,
          },
          
        }}
      />
    </Stack.Navigator>
  );
};

export default FeedStack;
