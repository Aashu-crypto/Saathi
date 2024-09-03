import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Divider = () => {
  return <View style={styles.divider} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    borderWidth: 0.5,

    width: "100%",
    height: 0,
    marginVertical: 10,
  },
});
