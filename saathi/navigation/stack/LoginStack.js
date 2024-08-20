import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Feed from "../../screens/feed/Feed";
import LoginScreen from "../../screens/LoginScreens/LoginScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Route } from "../../routes";
import SignUp from "../../screens/LoginScreens/SignUp";

const LoginStack = () => {
  const Stack = createStackNavigator();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const no = await AsyncStorage.getItem("number");
        console.log("Retrieved number:", no);
        setUser(no);
      } catch (error) {
        console.log("Error fetching user number:", error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  if (loading) {
    // You can return a loading indicator here if you prefer
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Route.LOGIN} component={LoginScreen} />
      <Stack.Screen name ={Route.SIGNUP} component={SignUp}/>
    </Stack.Navigator>
  );
};

export default LoginStack;
