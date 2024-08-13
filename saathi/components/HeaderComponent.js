import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import { Color, width } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const HeaderComponent = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.feedHeader}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 36,
          marginLeft: 5,
        }}
      >
        <Text style={styles.read}>{title}</Text>
        <Pressable></Pressable>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  feedHeader: {
    height: 100,
    width: width,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  read: {
    color: Color.colorDarkslategray,
    fontWeight: "700",
    fontSize: 25,
  },
});
