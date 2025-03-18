import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import Feed from "../../screens/feed/Feed";
import { Route } from "../../routes";
import { Color } from "../../GlobalStyles";
import ArticlesRead from "../../screens/feed/ArticlesRead";

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
          headerTitle: () => (
            <Image 
              source={require('../../assets/imgs/headerLogo.png')}
              style={{ width: 100, height: 40, resizeMode: 'contain' }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={Route.ARTICLES_READ}
        component={ArticlesRead}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image 
              source={require('../../assets/imgs/headerLogo.png')}
              style={{ width: 100, height: 40, resizeMode: 'contain' }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default FeedStack;
