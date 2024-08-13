import React from "react";
import { View, Text } from "react-native";
import HeaderComponent from "../../components/HeaderComponent";

const Feed = () => {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <HeaderComponent title={"FEED"} />
    </View>
  );
};

export default Feed;
