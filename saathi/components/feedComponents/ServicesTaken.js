import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ServicesTaken = () => {
  const serviceLogs = [
    {
      id: "1",
      service: "City Ride",
      description: "A ride to the city center and back.",
      status: "Pending",
      date: "2024-08-21",
    },
    {
      id: "2",
      service: "Home Visit",
      description: "Weekly health check and well-being visit.",
      status: "Pending",
      date: "2024-08-22",
    },
    {
      id: "3",
      service: "Grocery Errand",
      description: "Errand for picking up groceries.",
      status: "Completed",
      date: "2024-08-19",
    },
    {
      id: "4",
      service: "Pharmacy Errand",
      description: "Errand to pick up medication from the pharmacy.",
      status: "Completed",
      date: "2024-08-23",
    },
    {
      id: "5",
      service: "City Ride",
      description: "A ride to the park and back.",
      status: "Completed",
      date: "2024-08-20",
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.logItem,
          item.status === "Completed" ? styles.completed : styles.pending,
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.service}>{item.service}</Text>
          <Ionicons
            name={
              item.status === "Completed" ? "checkmark-circle" : "time-outline"
            }
            size={20}
            color={item.status === "Completed" ? "green" : "orange"}
          />
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity</Text>
      <FlatList
        data={serviceLogs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ServicesTaken;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  service: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
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
});
