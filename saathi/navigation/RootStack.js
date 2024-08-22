import React from "react";
import { View, Text } from "react-native";

import { useSelector } from "react-redux";

import BottomTab from "./tab/BottomTab";
import { Route } from "../routes";
import LoginStack from "./stack/LoginStack";
const RootStack = () => {
  const navigation = useSelector((state) => state.screen.screen);

  switch (navigation) {
    case Route.MAIN:
      return <BottomTab />;
    case Route.LOGIN:
      return <LoginStack />;

    default:
      return <BottomTab />;
  }
};

export default RootStack;
