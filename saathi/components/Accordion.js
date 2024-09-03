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
import { Color } from "../GlobalStyles";
import img1 from "../assets/imgs/1.jpeg";
import img2 from "../assets/imgs/2.jpeg";
import img3 from "../assets/imgs/3.jpeg";
import img4 from "../assets/imgs/4.jpeg";

const Accordion = () => {
  const [activeSections, setActiveSections] = useState([0]);

  const SECTIONS = [
    {
      title: "Step 1: Register with us",
      content: "Saathi is easy to set up so start using right away.",
      img: img1,
    },
    {
      title: "Step 2: We assign a Saathi to you",
      content:
        "Select a care package that best suits your family’s needs, whether it’s regular social calls, errands, or in-person check-ins.",
      img: img2,
    },
    {
      title: "Step 3: Saathi connects with patrons",
      content:
        "Your assigned Saathi companion will reach out to your family member and start providing the care and support they need. You’ll receive updates and reports directly to your phone.",
      img: img3,
    },
    {
      title: "Step 4: Stay Informed",
      content:
        "Track your Saathi’s visits, check-ins, and progress reports through the app, so you always know how your loved one is doing.",
      img: img4,
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
          fontSize: 22,
          fontWeight: "600",
          textAlign: "left",
          marginVertical: 20,
          color: "#1F2937",
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
    paddingHorizontal: 10,
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
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

export default Accordion;
