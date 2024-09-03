import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Color, FontFamily } from "../../GlobalStyles";
import Packages from "../../components/feedComponents/Packages";
import { Route } from "../../routes";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ServiceSelector from "../../screens/service/Service";
const HomeScreenTab = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: FontFamily.poppinsRegular,
          fontWeight: "600",
        },
        tabBarIndicatorStyle: {
          backgroundColor: Color.appDefaultColor,
          height: 2,
        },
      }}
    >
      <Tab.Screen name="Packages" component={Packages} />
      <Tab.Screen name="Services" component={ServiceSelector} />
    </Tab.Navigator>
  );
};

export default HomeScreenTab;

const styles = StyleSheet.create({});
