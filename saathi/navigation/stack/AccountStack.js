import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../../screens/account/Account";
import { Route } from "../../routes";
const AccountStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Route.ACCOUNT} component={Account} />
    </Stack.Navigator>
  );
};

export default AccountStack;
