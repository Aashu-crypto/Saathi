import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const availableServices = [
  { id: "1", service: "City Ride", icon: "car-outline" },
  { id: "2", service: "Home Visit", icon: "home-outline" },
  { id: "3", service: "Grocery Errand", icon: "cart-outline" },
  { id: "4", service: "Pharmacy Errand", icon: "medkit-outline" },
];

const ServiceSelector = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [patronName, setPatronName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const handleConfirm = () => {
    // Process the service booking with the entered data
    console.log({
      service: selectedService,
      date,
      patronName,
      address,
      mobileNumber,
    });
    setModalVisible(false);
    // Reset inputs
    setPatronName("");
    setAddress("");
    setMobileNumber("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select a Service</Text>
      <FlatList
        data={availableServices}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => handleServiceSelect(item.service)}
          >
            <View style={styles.serviceIconContainer}>
              <Ionicons name={item.icon} size={24} color="white" />
            </View>
            <Text style={styles.serviceText}>{item.service}</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Schedule {selectedService}</Text>

              <Text style={styles.modalDescription}>
                Please fill in the details below to book the service.
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Patron Name"
                value={patronName}
                onChangeText={setPatronName}
                placeholderTextColor="#aaa"
              />
              <Text style={styles.inputLabel}>
                Name of the person for whom the service is being booked.
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
                placeholderTextColor="#aaa"
              />
              <Text style={styles.inputLabel}>
                Complete address for the service visit.
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                placeholderTextColor="#aaa"
              />
              <Text style={styles.inputLabel}>
                Contact number for any follow-up.
              </Text>

              <TouchableOpacity
                onPress={() => setShowPicker(true)}
                style={styles.datePickerButton}
              >
                <Text style={styles.datePickerText}>
                  {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
              <Text style={styles.inputLabel}>
                Select the preferred date and time for the service.
              </Text>

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
                  style={[styles.button, styles.confirmButton]}
                  onPress={handleConfirm}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default ServiceSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  serviceIconContainer: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  serviceText: {
    fontSize: 18,
    color: "#333",
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  inputLabel: {
    fontSize: 12,
    color: "#555",
    marginBottom: 15,
  },
  datePickerButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: "center",
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: "#28a745",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
