import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Feed from "../../screens/feed/Feed";
import LoginScreen from "../../screens/LoginScreens/LoginScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Route } from "../../routes";
import { Color } from "../../GlobalStyles";
import SignUp from "../../screens/LoginScreens/SignUp";
import OTPScreen from "../../screens/LoginScreens/OTPScreen";
import PasswordScreen from "../../screens/LoginScreens/ConfirmPassword";

const LoginStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={Route.SIGNUP}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={Route.SIGNUP}
        component={SignUp}
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
      <Stack.Screen
        name={Route.LOGIN}
        component={LoginScreen}
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
      <Stack.Screen
        name={Route.OTPSCREEN}
        component={OTPScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: "",
          headerTitleStyle: {
            color: Color.appDefaultColor,

            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name={Route.CONFIRMPASSWORD}
        component={PasswordScreen}
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

export default LoginStack;
