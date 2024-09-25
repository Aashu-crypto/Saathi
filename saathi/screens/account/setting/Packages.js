import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Color, FontFamily } from "../../../GlobalStyles";
import { useSelector } from "react-redux";

const MyPackage = () => {
  const [request, setRequest] = useState([]);
  const [expandedServiceId, setExpandedServiceId] = useState(null);
  const profile = useSelector((state) => state.profile.data);

  useEffect(() => {
    if (profile.subscriberID !== 0) {
      const fetchRequests = async () => {
        const response = await fetch(
          `https://saathi.etheriumtech.com:444/Saathi/subscribers/7/services`
        );
        const json = await response.json();
        setRequest(json);
      };
      fetchRequests();
    }
  }, [profile]);

  const packageData = {
    id: "2",
    title: "Bronze",
    description: `Includes a 1 hour call to the patrons every week and a record of the call entered into the ‘My Feed’ section of the app for the ‘subscribers’ through the admin tool.\n\nWill include two visits to the house of the patrons to check on their health, click a picture with them, and to ensure their well-being, plus up to 2 hours of running errands* on behalf of the patrons.\n\nAll interactions (including digital media) will be uploaded into the ‘My Feed’ for the ‘subscribers’ through the admin tool.`,
    price: "$40/m\n(Rs. 3500/m)",
    icon: "medal-outline",
  };

  const handleLongPress = (id) => {
    setExpandedServiceId(expandedServiceId === id ? null : id);
  };

  const renderInteractions = (interactions) => {
    return (
      <View style={styles.interactionList}>
        {interactions.map((interaction, index) => (
          <View key={index} style={styles.interactionItem}>
            <Text style={styles.interactionText}>
              Service No. {index + 1} Completion Notes -{" "}
              {interaction.description || "No description"}
            </Text>
            {interaction.documents && (
              <Text style={styles.documentText}>Document: {interaction.documents}</Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const isCompleted = item.completionStatus === "Completed";
    const interactionsCompleted = item.interactions.filter(
      (interaction) => interaction.completionStatus === 1
    ).length;
    const interactionsPending = item.pending;
    const isExpanded = expandedServiceId === item.packageServiceID;

    return (
      <TouchableOpacity
        onLongPress={() => handleLongPress(item.packageServiceID)}
        style={[styles.logItem, isCompleted ? styles.completed : styles.pending]}
      >
        <View style={styles.header}>
          <Text style={styles.service}>{item.serviceName}</Text>
          <Ionicons
            name={isCompleted ? "checkmark-circle" : "time-outline"}
            size={20}
            color={isCompleted ? "green" : "orange"}
          />
        </View>
        <Text style={styles.status}>
          {interactionsCompleted} Completed / {interactionsPending} Pending
        </Text>
        {isCompleted && item.completionDate && (
          <Text style={styles.date}>Completed on: {item.completionDate}</Text>
        )}
        {isExpanded && renderInteractions(item.interactions)}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.packageContainer}>
          <View style={styles.packageHeader}>
            <Ionicons name={packageData.icon} size={28} color="#FFF" />
            <Text style={styles.packageTitle}>{packageData.title}</Text>
          </View>
          <Text style={styles.packageDescription}>{packageData.description}</Text>
          <Text style={styles.packagePrice}>{packageData.price}</Text>
        </View>
        <FlatList
          data={request}
          renderItem={renderItem}
          keyExtractor={(item) => item.packageServiceID.toString()}
          contentContainerStyle={styles.list}
        />
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
    backgroundColor: Color.appDefaultColor,
  },
  packageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  packageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: 10,
  },
  packageDescription: {
    fontSize: 16,
    color: "#FFF",
    lineHeight: 24,
    marginBottom: 20,
  },
  packagePrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "right",
  },
  list: {
    paddingBottom: 20,
    gap: 15,
  },
  logItem: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 13,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  service: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsRegular,
    letterSpacing: 2,
  },
  status: {
    fontSize: 14,
    color: "#999",
  },
  date: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
  },
  completed: {
    borderLeftColor: "green",
    borderLeftWidth: 4,
  },
  pending: {
    borderLeftColor: "orange",
    borderLeftWidth: 4,
  },
  interactionList: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  interactionItem: {
    paddingVertical: 5,
  },
  interactionText: {
    fontSize: 14,
    color: "#333",
  },
  documentText: {
    fontSize: 12,
    color: "#888",
  },
});

export default MyPackage;
