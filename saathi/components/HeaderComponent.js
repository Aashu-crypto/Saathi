import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import { Color, width } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";

const HeaderComponent = ({ title }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.feedHeader}>
      <View
        style={{
          flex: 1,

          justifyContent: "space-between",

          marginLeft: 5,
        }}
      >
        <Text style={styles.read}>{title}</Text>
        <Text
          style={{
            textAlign: "center",
            paddingHorizontal: 15,
            paddingBottom: 15,
            fontWeight: "400",
            fontSize: 11,
            color: Color.colorGray,
          }}
        >
          A companion for you and your loved ones
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  feedHeader: {
    height: 90,
    width: width,
    paddingHorizontal: 20,
    backgroundColor: "#fff",

    alignItems: "center",
    marginTop: Platform.OS == "android" && 25,
  },
  read: {
    color: Color.colorDarkslategray,
    fontWeight: "900",
    fontSize: 27,
    letterSpacing: 2,
    color: Color.appDefaultColor,
    fontFamily: "Dream-Orphans-bd",
    textAlign: "center",
  },
});
