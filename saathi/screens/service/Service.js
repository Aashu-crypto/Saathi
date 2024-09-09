import React, { useEffect, useState } from "react";
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
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Color, width } from "../../GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { screen } from "../../Redux/Slice/screenNameSlice";
import { Route } from "../../routes";
import { BACKEND_HOST } from "../../config"; // Assuming your config has BACKEND_HOST

const availableServices = [
  {
    id: "1",
    service: "Destination Drive",
    icon: "car-outline",
    cost: "$40/m (Rs. 3000)",
    details:
      "Each Destination Drive provided at $40 (Rs. 3000) – Total of less than 3 hours and limited to 2 patrons; Driving done in a small sedan so luggage should be appropriate. No more than 2 people allowed. Each extra person will be a $10 (Rs. 800) extra charge; Driving hours between 7 am and 10 pm. Surge pricing (1.5x basic charge applied outside the normal driving hours); For larger cars, an extra fixed levy of $20 (Rs. 1600) applied. Each extra hour of driving will be charged at $15 (Rs. 1200).",
  },
  {
    id: "2",
    service: "House Check",
    icon: "home-outline",
    cost: "$10/m (Rs. 800)",
    details:
      "Each extra house check provided at $10 (Rs. 800). House checks will be done during normal business hours (between 10 am and 6 pm only). Any house check done outside of business hours will incur a Surge pricing charge (1.5x basic charge).",
  },
  {
    id: "3",
    service: "Errand Run",
    icon: "cart-outline",
    cost: "$20/m (Rs. 1500)",
    details:
      "Each errand run provided at $20 (Rs. 1500) – Total of less than 2 hours.",
  },
];

const ServiceSelector = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmBookingVisible, setConfirmBookingVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [patronName, setPatronName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false); // For showing the loader during API call
  const [patron, setPatron] = useState();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data || {});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_HOST}patrons/subscriber/1`);
        const data = await response.json();
        setPatron(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        Alert.alert("Error Occured");
      }
    };
    fetchData();
  }, []);
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const handleConfirm = async () => {
 

    const bookingDetails = {
      serviceID: selectedService.id,
      serviceDate: date.toISOString().split("T")[0],
      serviceTime: date.toTimeString().split(" ")[0],
      billingStatus: 1, // Assuming 1 means billed
      isAccepted: true,
      subscriberID: profile.subscriberID,
    };

    try {
      setLoading(true); // Show loader while API request is in progress
      const response = await fetch(`${BACKEND_HOST}subscriber-services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to book the service. Please try again.");
      }

      Alert.alert(
        "Thank you for choosing us !",
        "We will get back to you soon"
      );
      setConfirmBookingVisible(false);
      setModalVisible(false);

      // Reset inputs after booking
      setPatronName("");
      setAddress("");
      setMobileNumber("");
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong.");
    } finally {
      setLoading(false); // Hide loader after the request is completed
    }
  };

  const handleProceed = () => {
    if (Object.keys(profile).length === 0) {
      Alert.alert(
        "Login Required",
        "Please log in to continue with your booking.",
        [
          {
            text: "Proceed to Login",
            onPress: () => dispatch(screen(Route.LOGIN)),
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]
      );
      return; // Prevent proceeding if the user is not logged in
    }

    setConfirmBookingVisible(true);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Request a Service</Text>
      <FlatList
        data={availableServices}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => handleServiceSelect(item)}
          >
            <View style={styles.serviceIconContainer}>
              <Ionicons name={item.icon} size={24} color="white" />
            </View>
            <Text style={styles.serviceText}>{item.service}</Text>
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
              <Text style={styles.modalTitle}>{selectedService.service}</Text>
              <Text style={styles.modalCost}>Cost: {selectedService.cost}</Text>

              <ScrollView style={styles.modalDetailsContainer}>
                <Text style={styles.modalDetails}>
                  {selectedService.details}
                </Text>
              </ScrollView>

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleProceed}>
                  <Text style={styles.buttonText}>Proceed to Booking</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {confirmBookingVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmBookingVisible}
          onRequestClose={() => setConfirmBookingVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  Schedule {selectedService.service}
                </Text>

                {/* <TextInput
                  style={styles.input}
                  placeholder="Patron Name"
                  value={patronName}
                  onChangeText={setPatronName}
                  placeholderTextColor="#aaa"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  value={address}
                  onChangeText={setAddress}
                  placeholderTextColor="#aaa"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number"
                  keyboardType="phone-pad"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  placeholderTextColor="#aaa"
                /> */}

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
                  <TouchableOpacity onPress={handleConfirm}>
                    <Text style={styles.confirmButtonText}>
                      {loading ? <ActivityIndicator /> : "Confirm Booking"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setConfirmBookingVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
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
    fontSize: 20,
    fontWeight: "400",
    marginVertical: 20,
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
    backgroundColor: Color.appDefaultColor,
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
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker background for better focus on the modal
  },
  modalContent: {
    width: "85%", // Slightly narrower for a more compact look
    backgroundColor: "white",
    borderRadius: 20, // Rounded corners for a softer appearance
    padding: 25, // More padding for spacious layout
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // More pronounced shadow for depth
    shadowOpacity: 0.3,
    shadowRadius: 10, // Soft shadow for a polished look
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24, // Larger font for the title
    fontWeight: "bold",
    marginBottom: 15, // More spacing below the title
    textAlign: "center",
    color: "#333", // Darker text color for better readability
  },
  modalCost: {
    fontSize: 18, // Slightly larger cost text
    color: "#666",
    marginBottom: 20, // Extra space below cost to separate it from details
    textAlign: "center",
    fontWeight: "600",
  },
  modalDetailsContainer: {
    maxHeight: 150, // Constrain height to ensure it doesn’t overflow
    marginBottom: 20, // Space between details and buttons
  },
  modalDetails: {
    fontSize: 16, // Increased font size for better readability
    color: "#555", // Softer color for details
    textAlign: "justify", // Justify text for a clean edge
    lineHeight: 24, // Line height for improved readability
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
    padding: 5, // Slightly larger padding for better tap target
    borderRadius: 10, // Rounded corners for buttons
    alignItems: "center",
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: Color.appDefaultColor, // Professional green for confirmation
  },
  cancelButton: {
    backgroundColor: "black", // Professional red for cancellation
  },
  buttonText: {
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
  },
});
