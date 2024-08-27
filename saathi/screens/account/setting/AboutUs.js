import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderComponent from "../../../components/HeaderComponent";
import { Color } from "../../../GlobalStyles";

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderComponent title={"About Us"} />
      <Text style={styles.heading}>Why Saathi?</Text>

      <Text style={styles.paragraph}>
        Saathi was created with one goal in mind: to bring peace of mind to
        families who live far from their loved ones. We understand the
        challenges of being away, so we’ve developed a solution that allows you
        to stay involved in their care, even from a distance. Saathi’s
        companions are trained, compassionate individuals who provide regular
        check-ins, social visits, and practical assistance.
      </Text>

      <View style={styles.keyValuesContainer}>
        <View style={styles.keyValue}>
          <Ionicons
            name="heart-outline"
            size={24}
            color="#4A90E2"
            style={styles.icon}
          />
          <Text style={styles.keyValueTitle}>Companionship</Text>
          <Text style={styles.keyValueText}>
            Every Saathi is dedicated to being more than just an assistant –
            they are a friend who helps reduce feelings of loneliness and
            isolation.
          </Text>
        </View>

        <View style={styles.keyValue}>
          <Ionicons
            name="medkit-outline"
            size={24}
            color="#4A90E2"
            style={styles.icon}
          />
          <Text style={styles.keyValueTitle}>Professional Care</Text>
          <Text style={styles.keyValueText}>
            Our companions are trained to handle a variety of needs, from simple
            conversations to helping with everyday tasks like errands or medical
            appointments.
          </Text>
        </View>

        <View style={styles.keyValue}>
          <View>
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color="#4A90E2"
              style={styles.icon}
            />
            <Text style={styles.keyValueTitle}>Trust and Reliability</Text>
          </View>

          <Text style={styles.keyValueText}>
            You can rely on us to keep you informed, providing regular updates
            so you always know your family is in good hands.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: Color.appDefaultColor,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 30,
    lineHeight: 24,
  },
  keyValuesContainer: {
    marginTop: 10,
  },
  keyValue: {
    alignItems: "flex-start",
    marginBottom: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
  },
  keyValueTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },
  keyValueText: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
  },
});

export default AboutUs;
