import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Color, FontFamily, width } from "../../GlobalStyles";

import Accordion from "../Accordion";
import AllCuresBlog from "./AllCuresBlog";
import MemberShipBenefits from "./MemberShipBenefits";
import Testimonials from "./Testimonials";
import PackagesDetails from "./PackagesDetails";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.introText}>
        Saathi provides a wide range of services to make life easier for your
        loved ones and give you peace of mind.
      </Text>
      <MemberShipBenefits />
      <Accordion />

      <Text style={styles.sectionTitle}>Explore our Packages</Text>
      <PackagesDetails />
      <Text style={styles.sectionTitle}>Cures from around the world</Text>
      <AllCuresBlog />
      <Testimonials />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  introText: {
    textAlign: "center",
    paddingHorizontal: 15,
    fontWeight: "400",
    color: Color.colorGray,
    borderRadius: 10,
    padding: 5,
    fontSize: 12,
    lineHeight: 15,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 20,
    color: Color.appDefaultColor,
    backgroundColor: Color.lightOrange,
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Color.appDefaultColor,
    marginHorizontal: 10,
  },
  flatListContainer: {
    // position: "relative", // Required to position arrows absolutely
    flexDirection: "row", // Align arrows and flatlist horizontally
    alignItems: "center", // Align arrows and flatlist vertically
  },
  flatListWrapper: {
    flex: 1, // Allow the flatlist to take up the available space between arrows
    overflow: "visible", // Make sure content overflows aren't clipped
  },
  leftArrow: {
    position: "absolute",
    left: 0,
    zIndex: 1,
    padding: 10,
  },
  rightArrow: {
    position: "absolute",
    right: 0,
    zIndex: 1,
    padding: 10,
  },
  packageList: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },

  errorText: {
    textAlign: "center",
    color: "red",
    marginVertical: 10,
  },
});
