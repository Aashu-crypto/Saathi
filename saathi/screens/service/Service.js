import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { screen } from "../../Redux/Slice/screenNameSlice";
import { Route } from "../../routes";
import { BACKEND_HOST } from "../../config"; // Assuming your config has BACKEND_HOST
import { Color, FontFamily } from "../../GlobalStyles";

const ServiceSelector = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmBookingVisible, setConfirmBookingVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data || {});

  // Fetch services from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_HOST}/alacarteservices`);
        const data = await response.json();

        setServices(data);
      } catch (error) {
        Alert.alert("Error Occured", error.message);
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
    if (!selectedService) return;

    const bookingDetails = {
      serviceID: selectedService.serviceID,
      serviceDate: date.toISOString().split("T")[0],
      serviceTime: date.toTimeString().split(" ")[0],
      billingStatus: 1,
      isAccepted: true,
      subscriberID: profile.subscriberID,
    };

    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_HOST}/subscriber-services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      });

      if (!response.ok)
        throw new Error("Failed to book the service. Please try again.");

      Alert.alert(
        "Success",
        "Thank you for choosing us! We will get back to you soon."
      );
      setConfirmBookingVisible(false);
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    if (!Object.keys(profile).length) {
      Alert.alert(
        "Login Required",
        "Please log in to continue with your booking.",
        [
          {
            text: "Proceed to Login",
            onPress: () => dispatch(screen(Route.LOGIN)),
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
      return;
    }
    setConfirmBookingVisible(true);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Request a Service</Text>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => handleServiceSelect(item)}
          >
            <View style={styles.serviceDetailsContainer}>
              <Text style={styles.serviceText}>{item.serviceName}</Text>
              <Text style={styles.priceText}>
                {`Price: ₹${item.priceINR} / $${item.priceUSD}`}
              </Text>
              <Text style={styles.frequencyText}>
                {item.frequencyUnit
                  ? `Frequency: ${item.frequencyUnit}`
                  : "No set frequency"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.serviceID.toString()}
        contentContainerStyle={styles.list}
      />

      {/* Service Modal */}
      {modalVisible && selectedService && (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {selectedService.serviceName}
              </Text>
              <Text style={styles.modalDescription}>
                {selectedService.serviceDescription}
              </Text>
              <Text style={styles.modalCost}>
                Price: ₹{selectedService.priceINR} / ${selectedService.priceUSD}
              </Text>
              <Text style={styles.modalDetails}>
                Business Hours: {selectedService.businessHoursStart} to{" "}
                {selectedService.businessHoursEnd}
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleProceed}
                  style={styles.proceedButton}
                >
                  <Text style={styles.buttonText}>Proceed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Confirm Booking Modal */}
      {confirmBookingVisible && selectedService && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmBookingVisible}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
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
                      {loading ? <ActivityIndicator /> : "Confirm Booking"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setConfirmBookingVisible(false)}
                    style={styles.cancelButton}
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
    backgroundColor: "#f8f9fd", // Light background color
  },
  title: {
    fontSize: 26, // Bigger title
    fontWeight: "500",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: FontFamily.poppinsRegular,
  },
  list: {
    paddingBottom: 20,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  serviceDetailsContainer: {
    flex: 1,
  },
  serviceText: {
    fontSize: 18,
    fontWeight: "600",
    color: Color.appDefaultColor,
    marginBottom: 5,
  },
  priceText: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  frequencyText: {
    fontSize: 12,
    color: "#999",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    color: "#555",
    textAlign: "justify",
    marginBottom: 10,
    lineHeight: 24,
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
    backgroundColor: "#efefef",
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
    padding: 12,
    borderRadius: 10,
    flex: 1,
    width: 300,

    alignItems: "center",
  },
  cancelButton: {
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: Color.appDefaultColor,
    fontSize: 16,
    fontWeight: "500",
  },
  confirmButtonText: {
    color: Color.appDefaultColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "red",
    fontSize: 16,
  },
});
