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
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  feedHeader: {
    height: 90,
    width: width,
    paddingHorizontal: 20,
    backgroundColor:'#fff'
  },
  read: {
    color: Color.colorDarkslategray,
    fontWeight: "700",
    fontSize: 27,
    letterSpacing: 2,
    color: "#034F75",
  },
});
