import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import FeedStack from "../stack/FeedStack";
import AccountStack from "../stack/AccountStack";
import { Route } from "../../routes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Color } from "../../GlobalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import Service from "../../screens/service/Service";
import FeedServiceTaken from "../../components/feedComponents/FeedServiceTaken";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  const profile = useSelector((state) => state.profile.data);
  const status = useSelector((state) => state.status.status);
  const [tabBtnStatus, setTabBtnStatus] = useState(false);

  useEffect(() => {
    // Disable tab buttons if profile data is empty
    setTabBtnStatus(Object.keys(profile).length === 0);
  }, [profile]);

  // Common options for headers
  const headerOptions = {
    headerShown: true,
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontFamily: "Dream-Orphans-bd",
      color: Color.appDefaultColor,
      letterSpacing: 2,
      fontSize: 25,
    },
  };

  // Common Tab Button Options
  const tabButtonOptions = (props) => (
    <TouchableOpacity
      {...props}
      disabled={tabBtnStatus}
      style={{ opacity: tabBtnStatus ? 0.5 : 1 }} // Adjust opacity when disabled
    />
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Color.appDefaultColor,
        tabBarInactiveTintColor: Color.colorGrayLight,
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
      {Object.keys(profile).length !== 0 && status === 1 && (
        <Tab.Screen
          name={"Feed"}
          component={FeedServiceTaken}
          options={{
            title: "Feed",
            ...headerOptions,
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="feed"
                size={25}
                color={focused ? Color.appDefaultColor : Color.colorSilver}
              />
            ),
            // tabBarButton: tabButtonOptions, // Use the reusable tab button function
          }}
        />
      )}
      {Object.keys(profile).length !== 0 && (
        <Tab.Screen
          name={Route.SERVICE_STACK}
          component={Service}
          options={{
            title: "Services",
            ...headerOptions,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="briefcase"
                size={25}
                color={focused ? Color.appDefaultColor : Color.colorSilver}
              />
            ),
            //tabBarButton: tabButtonOptions, // Use the reusable tab button function
          }}
        />
      )}

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
