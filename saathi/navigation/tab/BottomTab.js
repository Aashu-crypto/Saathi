import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FeedStack from "../stack/FeedStack";
import AccountStack from "../stack/AccountStack";
import { Route } from "../../routes";

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={Route.FEED_STACK}
        component={FeedStack}
        options={{
          title: "Feed",
        }}
      />
      <Tab.Screen
        name={Route.ACCOUNT_STACK}
        component={AccountStack}
        options={{
          title: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
