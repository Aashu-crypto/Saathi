import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../../screens/account/Account";
import { Route } from "../../routes";
import AboutUs from "../../screens/account/setting/AboutUs";
import Packages from "../../components/feedComponents/Packages";
import Saathi from "../../screens/account/setting/Saathi";
import YourPackages from "../../screens/account/setting/Packages";
const AccountStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Route.ACCOUNT} component={Account} />
      <Stack.Screen name={Route.ABOUTUS} component={AboutUs} />
      <Stack.Screen name={Route.YOURPACKAGES} component={YourPackages} />
      <Stack.Screen name={Route.YOURSAATHI} component={Saathi} />
    </Stack.Navigator>
  );
};

export default AccountStack;
