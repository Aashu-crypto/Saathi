import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Route } from "../../routes/router";
import FeedStack from "../stack/FeedStack";
import AccountStack from "../stack/AccountStack";

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={Route.FEED_STACK} component={FeedStack} />
      <Tab.Screen name={Route.ACCOUNT_STACK} component={AccountStack} />
    </Tab.Navigator>
  );
};

export default BottomTab;
