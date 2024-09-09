import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Feed from "../../screens/feed/Feed";
import LoginScreen from "../../screens/LoginScreens/LoginScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Route } from "../../routes";
import { Color } from "../../GlobalStyles";
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
    initialRouteName={Route.LOGIN}
      screenOptions={{
        headerShown: false,
        
      }}
    >
      <Stack.Screen name={Route.SIGNUP} component={SignUp}  options={{
        headerShown:true,
        headerTitleAlign:"center",
        headerTitle:'Saathi',
        headerTitleStyle:{
          fontFamily:'Dream-Orphans-bd',
          color:Color.appDefaultColor,
          letterSpacing:2,
          fontSize:25
        }
      }} />
      <Stack.Screen name={Route.LOGIN} component={LoginScreen}  options={{
        headerShown:true,
        headerTitleAlign:"center",
        headerTitle:'Saathi',
        headerTitleStyle:{
          fontFamily:'Dream-Orphans-bd',
          color:Color.appDefaultColor,
          letterSpacing:2,
          fontSize:25
        }
      }} />
    </Stack.Navigator>
  );
};

export default LoginStack;
