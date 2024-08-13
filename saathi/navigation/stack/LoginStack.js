import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Route } from "../../routes/router";
import Feed from "../../screens/feed/Feed";
import LoginScreen from "../../screens/LoginScreens/LoginScreen";
import OTPVerificationScreen from "../../screens/LoginScreens/OTPScreen";
const LoginStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Route.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Route.OTP} component={OTPVerificationScreen} />
    </Stack.Navigator>
  );
};

export default LoginStack;
