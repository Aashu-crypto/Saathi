import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import HeaderComponent from "../../../components/HeaderComponent";
import { Color } from "../../../GlobalStyles";

const MyPackage = () => {
  const packageData = {
    id: "2",
    title: "Bronze",
    description: `Includes a 1 hour call to the patrons every week and a record of the call entered into the ‘My Feed’ section of the app for the ‘subscribers’ through the admin tool.\n\nWill include two visits to the house of the patrons to check on their health, click a picture with them, and to ensure their well-being, plus up to 2 hours of running errands* on behalf of the patrons.\n\nAll interactions (including digital media) will be uploaded into the ‘My Feed’ for the ‘subscribers’ through the admin tool.`,
    price: "$40/m\n(Rs. 3500/m)",
    icon: "medal-outline",
    
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
   
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.packageContainer}>
          <View style={styles.header}>
            <Ionicons name={packageData.icon} size={28} color="#FFF" />
            <Text style={styles.title}>{packageData.title}</Text>
          </View>
          <Text style={styles.description}>{packageData.description}</Text>
          <Text style={styles.price}>{packageData.price}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  packageContainer: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 6,
    backgroundColor:Color.appDefaultColor
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    color: "#FFF",
    lineHeight: 24,
    marginBottom: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "right",
  },
});

export default MyPackage;
