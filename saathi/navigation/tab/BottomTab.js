import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FeedStack from "../stack/FeedStack";
import AccountStack from "../stack/AccountStack";
import { Route } from "../../routes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Color } from "../../GlobalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import Service from "../../screens/service/Service";
const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Color.appDefaultColor,
        tabBarInactiveTintColor: Color.colorGrayLight,
        tabBarActiveBackgroundColor: Color.lightOrange,
      }}
    >
      <Tab.Screen
        name={Route.FEED_STACK}
        component={FeedStack}
        options={{
          title: "Home",

          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={25}
              color={focused ? Color.appDefaultColor : Color.colorSilver}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Route.SERVICE_STACK}
        component={Service}
        options={{
          title: "Schedule Services",
          headerShown: true,
          headerTitleAlign: "center",

          headerTitleStyle: {
            fontFamily: "Dream-Orphans-bd",
            color: Color.appDefaultColor,
            letterSpacing: 2,
            fontSize: 25,
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="briefcase"
              size={25}
              color={focused ? Color.appDefaultColor : Color.colorSilver}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Route.ACCOUNT_STACK}
        component={AccountStack}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={25}
              color={focused ? Color.appDefaultColor : Color.colorSilver}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
