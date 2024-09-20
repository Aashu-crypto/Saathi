import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
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
import { BACKEND_HOST } from "../../config";
import { Color, FontFamily } from "../../GlobalStyles";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
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
  const id = profile.subscriberID;
  console.log("profile", profile);

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
      subscriberID: profile.subscriberId,
    };
    console.log("booking Details", bookingDetails);

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_HOST}/alacarteservices/active`);
        const data = await response.json();
        setServices(data);
      } catch (error) {
        Alert.alert("Error Occurred", error.message);
      }
    };
    fetchData();
  }, []);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const renderIcon = (serviceName) => {
    switch (serviceName) {
      case "Phone Call":
        return (
          <Feather name="phone-call" size={28} color={Color.appDefaultColor} />
        );
      case "House Visit":
        return (
          <AntDesign name="home" size={28} color={Color.appDefaultColor} />
        );
      case "Running Errands":
        return (
          <MaterialCommunityIcons
            name="bike-fast"
            size={28}
            color={Color.appDefaultColor}
          />
        );
      case "Destination Drive":
        return <AntDesign name="car" size={28} color={Color.appDefaultColor} />;
      default:
        return (
          <Feather name="help-circle" size={28} color={Color.appDefaultColor} />
        );
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
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => handleServiceSelect(item)}
          >
            <View style={styles.serviceIconContainer}>
              {renderIcon(item.serviceName)}
            </View>
            <View style={styles.serviceDetailsContainer}>
              <Text style={styles.serviceText}>{item.serviceName}</Text>
              <Text style={styles.priceText}>
                ₹{item.priceINR} / ${item.priceUSD}
              </Text>
              <Text style={styles.descriptionText}>
                {item.serviceDescription}
              </Text>
            </View>
            <Feather
              name="chevron-right"
              size={24}
              color={Color.appDefaultColor}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.serviceID}
        contentContainerStyle={styles.list}
      />

      {/* Service Modal */}
      {modalVisible && selectedService && (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  <FontAwesome
                    name="info-circle"
                    size={22}
                    color={Color.appDefaultColor}
                  />{" "}
                  {selectedService.serviceName}
                </Text>
                <Text style={styles.modalDescription}>
                  {selectedService.serviceDescription}
                </Text>
                <Text style={styles.modalCost}>
                  Price: ₹{selectedService.priceINR} / $
                  {selectedService.priceUSD}
                </Text>
                {/* <Text style={styles.modalDetails}>
                  <Feather
                    name="clock"
                    size={16}
                    color={Color.appDefaultColor}
                  />{" "}
                  Business Hours: {selectedService.businessHoursStart} to{" "}
                  {selectedService.businessHoursEnd}
                </Text> */}

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleProceed}
                    style={[styles.proceedButton, styles.modalProceedButton]}
                  >
                    <Text style={styles.buttonText}>
                      <Feather
                        name="check-circle"
                        size={16}
                        color={Color.appDefaultColor}
                      />{" "}
                      Proceed
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
                  <FontAwesome
                    name="calendar"
                    size={22}
                    color={Color.appDefaultColor}
                    style={{ marginRight: 10 }}
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
                    style={[styles.proceedButton, styles.modalProceedButton]}
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
                    onPress={() => setConfirmBookingVisible(false)}
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
    </SafeAreaView>
  );
};

export default ServiceSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff", // Softer background color for a professional look
  },

  list: {
    paddingBottom: 20,
    marginTop: 20,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginVertical: 10,
    elevation: 3,
  },
  serviceIconContainer: {
    marginRight: 15,
    padding: 10,
    backgroundColor: Color.lightOrange,
    borderRadius: 10,
  },
  serviceDetailsContainer: {
    flex: 1,
    marginRight: 10,
  },
  serviceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  priceText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: "#777",
  },
  iconPosition: {
    position: "absolute",
    top: -14,
    right: 5,
    backgroundColor: Color.appDefaultColor,
    borderRadius: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background for focus
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
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    color: Color.colorDarkslategray,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    color: "#555",
    textAlign: "justify",
    marginBottom: 10,
    lineHeight: 22,
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
  modalProceedButton: {},
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
});
