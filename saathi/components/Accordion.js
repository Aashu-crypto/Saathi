import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { Ionicons } from "@expo/vector-icons";
import { Color, FontFamily } from "../GlobalStyles";

const Accordion = () => {
  const [activeSections, setActiveSections] = useState([0]);

  const SECTIONS = [
    {
      title: "Step 1: Sign Up with Saathi",
      content:
        "Download the Saathi app and register using your phone number to get started.",
    },
    {
      title: "Step 2: Choose a  Package",
      content:
        "Select a package that suits your family’s needs, from regular calls to home visits and running errands.",
    },
    {
      title: "Step 3: Saathi Begins Care",
      content:
        "Your assigned Saathi will connect with your loved ones, offering companionship and essential care, while you receive updates in the app.",
    },
    {
      title: "Step 4: Stay Connected",
      content:
        "Track visits, calls, and other activities in real-time through the app, ensuring your loved one is well cared for.",
    },
  ];

  const toggleSection = (index) => {
    setActiveSections((prevSections) =>
      prevSections.includes(index)
        ? prevSections.filter((i) => i !== index)
        : [...prevSections, index]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "500",
          textAlign: "center",
          marginVertical: 20,
          color: Color.appDefaultColor,
          fontFamily: FontFamily.poppinsRegular,

          textDecorationColor: Color.appDefaultColor,
          backgroundColor: Color.lightOrange,
          padding: 5,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: Color.appDefaultColor,
          overflow: "hidden",
          marginHorizontal: 10,
        }}
      >
        How We Work
      </Text>
      {SECTIONS.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <TouchableOpacity
            onPress={() => toggleSection(index)}
            style={styles.header}
          >
            <Text style={styles.headerText}>{section.title}</Text>
            <Ionicons
              name={
                activeSections.includes(index)
                  ? "chevron-up-outline"
                  : "chevron-down-outline"
              }
              size={24}
              color={Color.appDefaultColor}
            />
          </TouchableOpacity>
          <Collapsible collapsed={!activeSections.includes(index)}>
            <View style={styles.content}>
              <Text style={styles.contentText}>{section.content}</Text>
            </View>
          </Collapsible>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  sectionContainer: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  headerText: {
    fontSize: 14,

    color: Color.appDefaultColor,
    fontFamily: FontFamily.poppinsRegular,
    letterSpacing: 1,
  },
  content: {
    padding: 15,
    backgroundColor: "#F9F9F9",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  contentText: {
    fontSize: 12,
    color: Color.colorGrayNormal,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

export default Accordion;
