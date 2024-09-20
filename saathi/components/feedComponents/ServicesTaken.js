import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Color, FontFamily } from "../../GlobalStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
const ServicesTaken = () => {
  const [request, setRequest] = useState([]);
  const [expandedServiceId, setExpandedServiceId] = useState(null);
  const profile = useSelector((state) => state.profile.data);
  const [loading, setLoading] = useState(false);
  console.log("Profile", profile);

  useEffect(() => {
    console.log(profile.subscriberID);
    
    const fetchRequests = async () => {
      if (profile.subscriberID !== 0) {
        const response = await fetch(
          `https://saathi.etheriumtech.com:444/Saathi/subscribers/10/services`
        );
        const json = await response.json();
        console.log("request", json);
        setRequest(json);
      }
    };
    fetchRequests();
  }, [profile]);
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };
  const handleConfirm = () => {
    setModalVisible(false);
    Alert.alert(
      "Success",
      "Thank you for choosing us! We will get back to you soon."
    );
  };
  const handleLongPress = (id) => {
    // Toggle expanded service
    if (expandedServiceId === id) {
      setExpandedServiceId(null); // Close if the same service is held again
    } else {
      setExpandedServiceId(id);
    }
  };
  const [selectedService, setSelectedService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const renderInteractions = (interactions) => {
    return (
      <View style={styles.interactionList}>
        {interactions.map((interaction, index) => (
          <View key={index} style={styles.interactionItem}>
            <Text style={styles.interactionText}>
              Service No. {index + 1} Completition Notes -{" "}
              {interaction.description || "No description"}
            </Text>
            {interaction.documents && (
              <Text style={styles.documentText}>
                Document: {interaction.documents}
              </Text>
            )}
          </View>
        ))}
      </View>
    );
  };
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
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
        onPress={() => {
          setSelectedService(item);
          setModalVisible(true);
        }}
        style={[
          styles.logItem,
          isCompleted ? styles.completed : styles.pending,
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.service}>{item.serviceName}</Text>
          <Ionicons
            name={isCompleted ? "checkmark-circle" : "time-outline"}
            size={20}
            color={isCompleted ? "green" : "orange"}
          />
        </View>
        {/* <Text style={styles.description}>
          {item.packageName || "No"} Package - {item.frequency}{" "}
          {item.frequencyUnit}
        </Text> */}
        <Text style={styles.status}>
          {interactionsCompleted} Completed / {interactionsPending} Pending
        </Text>
        {isCompleted && item.completionDate && (
          <Text style={styles.date}>Completed on: {item.completionDate}</Text>
        )}
        {/* Show interactions if expanded */}
        {isExpanded && renderInteractions(item.interactions)}
        {modalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>
                    <FontAwesome
                      name="calendar"
                      size={22}
                      color={Color.appDefaultColor}
                    />{" "}
                    Schedule {selectedService.serviceName}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowPicker(true)}
                    style={styles.datePickerButton}
                  >
                    <Text style={styles.datePickerText}>
                      {date.toLocaleDateString()} {date.toLocaleTimeString()}
                    </Text>
                  </TouchableOpacity>

                  {showPicker && (
                    <DateTimePicker
                      value={date}
                      mode="datetime"
                      display="default"
                      onChange={handleDateChange}
                    />
                  )}

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={handleConfirm}
                      style={styles.proceedButton}
                    >
                      <Text style={styles.confirmButtonText}>
                        {loading ? (
                          <ActivityIndicator />
                        ) : (
                          <Feather
                            name="check-circle"
                            size={16}
                            color={Color.appDefaultColor}
                          />
                        )}{" "}
                        Confirm
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      style={styles.cancelButton}
                    >
                      <Text style={styles.cancelButtonText}>
                        <Feather name="x-circle" size={16} color="red" /> Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity</Text>
      <FlatList
        data={request}
        renderItem={renderItem}
        keyExtractor={(item) => item.packageServiceID}
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
    fontWeight: "400",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 2,
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
    fontWeight: "500",
    fontFamily: FontFamily.poppinsRegular,
    letterSpacing: 2,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 15,
    color: Color.colorDarkslategray,
    textAlign: "center",
    letterSpacing: 2,
    fontFamily: FontFamily.poppinsRegular,
  },

  modalCost: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
  },
  datePickerButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  proceedButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
    flex: 1,
  },
  cancelButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: Color.appDefaultColor,
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButtonText: {
    color: Color.appDefaultColor,
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButtonText: {
    color: "#ff5c5c",
    fontSize: 16,
    fontWeight: "600",
  },
  iconPosition: {
    position: "absolute",
    top: -14,
    right: 5,
    backgroundColor: Color.appDefaultColor,
    borderRadius: 14,
  },
});
