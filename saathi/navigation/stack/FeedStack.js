import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Feed from "../../screens/feed/Feed";
import { Route } from "../../routes";
const FeedStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Route.FEED} component={Feed} />
    </Stack.Navigator>
  );
};

export default FeedStack;
