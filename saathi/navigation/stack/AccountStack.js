import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../../screens/account/Account";
import { Route } from "../../routes";
import AboutUs from "../../screens/account/setting/AboutUs";
import Packages from "../../components/feedComponents/Packages";
import Saathi from "../../screens/account/setting/Saathi";
import YourPackages from "../../screens/account/setting/Packages";
import { Color } from "../../GlobalStyles";
const AccountStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Route.ACCOUNT} component={Account}
      options={{
        headerShown:true,
        headerTitleAlign:"center",
        headerTitle:'Profile',
        headerTitleStyle:{
          fontFamily:'Dream-Orphans-bd',
          color:Color.appDefaultColor,
          letterSpacing:2,
          fontSize:25
        }
      }}
      />
      <Stack.Screen name={Route.ABOUTUS} component={AboutUs} 
       options={{
        headerShown:true,
        headerTitleAlign:"center",
        headerTitle:'About Us',
        headerTitleStyle:{
          fontFamily:'Dream-Orphans-bd',
          color:Color.appDefaultColor,
          letterSpacing:2,
          fontSize:25
        }
      }}
      />
      <Stack.Screen name={Route.YOURPACKAGES} component={YourPackages}
       options={{
        headerShown:true,
        headerTitleAlign:"center",
        headerTitle:'Your Packages',
        headerTitleStyle:{
          fontFamily:'Dream-Orphans-bd',
          color:Color.appDefaultColor,
          letterSpacing:2,
          fontSize:25
        }
      }}
      />
      <Stack.Screen name={Route.YOURSAATHI} component={Saathi} 
       options={{
        headerShown:true,
        headerTitleAlign:"center",
        headerTitle:'Your Saathi',
        headerTitleStyle:{
          fontFamily:'Dream-Orphans-bd',
          color:Color.appDefaultColor,
          letterSpacing:2,
          fontSize:25
        }
      }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
