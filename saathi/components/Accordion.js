import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../GlobalStyles";

const Accordion = () => {
  const [activeSections, setActiveSections] = useState([0]);

  const SECTIONS = [
    {
      title: "Step 1: Let get Started!",
      content:
        " Saathi is easy to set up and start using right away.",
    },
    {
      title: "Step 2: Choose a Package",
      content:
        "Select a care package that best suits your family’s needs, whether it’s regular social calls, errands, or in-person check-ins.",
    },
    {
      title: "Step 3: Connect with a Saathi",
      content:
        "Your assigned Saathi companion will reach out to your family member and start providing the care and support they need. You’ll receive updates and reports directly to your phone.",
    },
    {
      title: "Step 4: Stay Informed",
      content:
        "Track your Saathi’s visits, check-ins, and progress reports through the app, so you always know how your loved one is doing.",
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
          fontWeight: "600",
          textAlign: "center",
          marginBottom: 10,
          color:Color.appDefaultColor
        }}
      >
        How It Works{" "}
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
              color="#4A90E2"
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
    padding: 10,
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
    fontSize: 16,
    fontWeight: "600",
    color: Color.appDefaultColor,
  },
  content: {
    padding: 15,
    backgroundColor: "#F9F9F9",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  contentText: {
    fontSize: 14,
    color: "#666666",
  },
});

export default Accordion;
