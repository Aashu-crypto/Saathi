import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { screen } from "../../Redux/Slice/screenNameSlice";
import { Route } from "../../routes";
import { BACKEND_HOST } from "../../config";
import { Color } from "../../GlobalStyles";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ServiceSelector = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmBookingVisible, setConfirmBookingVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [services, setServices] = useState([]);
  const [packageServices, setPackageServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data || {});
const status = useSelector(state=>state.status.status)
  const id = profile.subscriberID;

  // Handle date change for the booking
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const handleConfirm = async () => {
    // Basic validation
    if (!selectedService) {
      Alert.alert("Error", "Please select a service.");
      return;
    }

    if (!profile || !profile.subscriberID) {
      Alert.alert("Error", "Invalid subscriber information.");
      return;
    }

    if (!date) {
      Alert.alert("Error", "Please select a valid date and time.");
      return;
    }

    const bookingDetails = {
      serviceID: selectedService.serviceID,
      serviceDate: date.toISOString().split("T")[0], // Extract date in YYYY-MM-DD format
      serviceTime: date.toTimeString().split(" ")[0], // Extract time in HH:MM:SS format
      billingStatus: 1,
      subscriberID: profile.subscriberID,
    };
    console.log(bookingDetails);

    try {
      setLoading(true); // Show loading indicator

      let response;
      if (packageService == 1) {
        console.log("ispackageService", packageService);

        response = await sendPutRequest(bookingDetails);
      } else {
        response = await sendPostRequest(bookingDetails);
      }

      if (!response.ok) {

        const errorText = await response.text();
        throw new Error(
          errorText || "Failed to book the service. Please try again."
        );
      }

      // Booking was successful
      Alert.alert(
        "Booking Confirmed",
        "Your booking has been successfully confirmed."
      );
      setConfirmBookingVisible(false);
      setModalVisible(false);
    } catch (error) {
      // Error handling for failed API call or validation
      console.log(error);

      Alert.alert("Error", error.message || "Something went wrong.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Separate function for PUT request
  const sendPutRequest = async (bookingDetails) => {
    console.log("send put", bookingDetails);

    return await fetch(`${BACKEND_HOST}/subscribers/service/updateRequest`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestedDate: bookingDetails.serviceDate,
        requestedTime: bookingDetails.serviceTime,
        subscriberID: bookingDetails.subscriberID,
        serviceID: bookingDetails.serviceID,
      }),
    });
  };

  // Separate function for POST request
  const sendPostRequest = async (bookingDetails) => {
    console.log("post request");

    return await fetch(`${BACKEND_HOST}/subscriber-services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingDetails),
    });
  };

  // Fetch services and package services
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchingData(true);

        // Fetch general services
        const serviceResponse = await fetch(
          `${BACKEND_HOST}/alacarteservices/active`
        );
        const servicesData = await serviceResponse.json();
        setServices(servicesData);

        // Fetch package services based on subscriber ID
        if (id) {
          const packageResponse = await fetch(
            `${BACKEND_HOST}/subscribers/${id}`
          );
          const packageData = await packageResponse.json();
         const data = packageData.services.filter(item=>item.alaCarte ===false)
          setPackageServices(data|| []);
        }
      } catch (error) {
        Alert.alert("Error Occurred", error.message);
      } finally {
        setFetchingData(false);
      }
    };

    // Only fetch data once profile is available
    if (id) {
      fetchData();
    }
  }, [id,status]);

  // Handle service selection
  const [packageService, setPackageService] = useState();
  const handleServiceSelect = (service, no) => {
    setSelectedService(service);

    if (no === 1) {
      console.log("Package Service");

      setConfirmBookingVisible(true);
      setPackageService(1);
    } else {
      setPackageService(0)
      setModalVisible(true);
    }
  };

  // Render icons for the services
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

  // Handle proceeding to confirm booking
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

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleProceed}
                    style={[styles.proceedButton]}
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
      {fetchingData ? (
        <ActivityIndicator size="large" color={Color.appDefaultColor} />
      ) : (
        <ScrollView>
          <View>
            {/* Available Services Section */}
            {/* Package Services Section */}
            {packageServices.length > 0 && (
              <>
                <Text style={styles.sectionHeader}>Your Package Services</Text>
                {packageServices.map((service) => (
                  <TouchableOpacity
                    key={service.serviceID}
                    style={styles.packageServiceItem}
                    onPress={() => handleServiceSelect(service, 1)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.serviceIconContainer}>
                      {renderIcon(service.serviceName)}
                    </View>
                    <View style={styles.serviceDetailsContainer}>
                      <Text style={styles.serviceText}>
                        {service.serviceName}
                      </Text>
                      <Text style={styles.descriptionText}>
                        Included in your package
                      </Text>
                      <Text style={styles.pendingText}>
                        {service.completions} of {service.pending +service.completions } completed
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}
            <Text style={styles.sectionHeader}>Ala-Carte Services</Text>
            {services.map((service) => (
              <TouchableOpacity
                key={service.serviceID}
                style={styles.packageServiceItem}
                activeOpacity={0.7}
                onPress={() => handleServiceSelect(service)}
              >
                <View style={styles.serviceIconContainer}>
                  {renderIcon(service.serviceName)}
                </View>
                <View style={styles.serviceDetailsContainer}>
                  <Text style={styles.serviceText}>{service.serviceName}</Text>
                  <Text style={styles.priceText}>
                    ₹{service.priceINR} / ${service.priceUSD}
                  </Text>
                  <Text style={styles.descriptionText}>
                    {service.serviceDescription}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
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
                    style={[styles.proceedButton]}
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
    backgroundColor: "#fff",
  },
  list: {
    paddingBottom: 20,
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
  packageServiceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.lavender,
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
    backgroundColor: "#fff",
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
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 10,
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
  confirmButtonText: {
    color: Color.appDefaultColor,
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
  },
  cancelButtonText: {
    color: "#ff5c5c",
    fontSize: 16,
    fontWeight: "600",
  },
});
