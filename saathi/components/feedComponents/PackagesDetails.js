import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { screen } from "../../Redux/Slice/screenNameSlice";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Color, FontFamily, width } from "../../GlobalStyles";
import { subscriptionPackages } from "../../Redux/Slice/packageSlice";
import { BACKEND_HOST } from "../../config";
import { billingStatus } from "../../Redux/Slice/BillingStatusSlice";

const PackagesDetails = () => {
  const [packages, setPackages] = useState([]);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const profile = useSelector((state) => state.profile.data);
  const flatListRef = useRef(null); // Reference to the FlatList for manual scrolling
  const [scrollIndex, setScrollIndex] = useState(0); // Keep track of the current scroll position

  const handleSubscribe = (item) => {
    console.log(item);

    if (Object.keys(profile).length === 0) {
      dispatch(screen("LOGIN"));
    } else {
      Alert.alert("Payment ", "Payment Done Successfully", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => handlePayment(item.packageID) },
      ]);
    }
  };

  const handlePayment = async (id) => {
    console.log(id);
    try {
      const response = await fetch(
        `${BACKEND_HOST}/subscribers/${profile.subscriberID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
          body: JSON.stringify({
            billingStatus: 1,
            packageID: id,
            status: 1,
          }), // Convert the body to a JSON string
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update payment status"); // Handle HTTP errors
      }
      dispatch(billingStatus(1));

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
      Alert.alert("Status", "Payment Status is not Updated");
    }
  };

  const renderPackageItem = ({ item }) => (
    <Animated.View style={[styles.packageCard, animatedStyle]}>
      <View style={styles.cardBackground}>
        <View
          style={{
            backgroundColor: Color.appDefaultColor,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        >
          <View style={styles.packageHeader}>
            <Text style={styles.packageName}>
              {item.packageName.toUpperCase()}
            </Text>
          </View>

          <View style={styles.packagePriceContainer}>
            <View style={styles.priceWrapper}>
              <Text style={styles.packagePrice}>
                ₹{item.priceINR || "N/A"}/${item.priceUSD || "N/A"}
              </Text>
              <Text style={styles.packageSubtitle}>Per User/Month</Text>
            </View>
          </View>
        </View>

        <View style={styles.servicesList}>
          {item.packageServices.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Ionicons
                name={"checkmark-circle"}
                size={20}
                color={Color.appDefaultColor}
                style={styles.serviceIcon}
              />
              <Text style={styles.serviceText}>
                {service.serviceName} ({service.frequency} services per month)
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={() => handleSubscribe(item)}
        >
          <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  // Shared value for animations
  const translateY = useSharedValue(50);
  useEffect(() => {
    translateY.value = withTiming(0, { duration: 500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: withTiming(1, { duration: 600 }), // Fade in
    };
  });

  // Fetch subscription packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          "https://saathi.etheriumtech.com:444/Saathi/subscription-package/active"
        );
        const data = await response.json();
        dispatch(subscriptionPackages(data));

        if (Array.isArray(data)) {
          setPackages(data);
        } else {
          setError("Unexpected data format from the server.");
        }
      } catch (error) {
        setError("Error fetching packages. Please try again later.");
      }
    };
    fetchPackages();
  }, [dispatch]);

  // Scroll to the next or previous package
  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index,
    });
    setScrollIndex(index);
  };

  const handleNext = () => {
    if (scrollIndex < packages.length - 1) {
      scrollToIndex(scrollIndex + 1);
    }
  };

  const handlePrev = () => {
    if (scrollIndex > 0) {
      scrollToIndex(scrollIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.flatListContainer}>
          {/* Left arrow */}
          <TouchableOpacity
            style={[styles.arrowButton, styles.leftArrow]} // Add leftArrow style for positioning
            onPress={handlePrev}
            disabled={scrollIndex === 0} // Disable when on the first item
          >
            <AntDesign
              name="left"
              size={40}
              color={scrollIndex === 0 ? "#ccc" : Color.appDefaultColor}
            />
          </TouchableOpacity>

          {/* FlatList */}
          <FlatList
            ref={flatListRef}
            data={packages}
            renderItem={renderPackageItem}
            keyExtractor={(item) => item.packageID.toString()}
            horizontal
            pagingEnabled
            onScrollToIndexFailed={() => {}} // Prevent errors on fast scrolling
            showsHorizontalScrollIndicator={false}
          />

          {/* Right arrow */}
          <TouchableOpacity
            style={[styles.arrowButton, styles.rightArrow]} // Add rightArrow style for positioning
            onPress={handleNext}
            disabled={scrollIndex === packages.length - 1} // Disable when on the last item
          >
            <AntDesign
              name="right"
              size={40}
              color={
                scrollIndex === packages.length - 1
                  ? "#ccc"
                  : Color.appDefaultColor
              }
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PackagesDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  packageCard: {
    width: width, // Adjust the card width
    alignItems: "center",
    justifyContent: "center",
  },
  cardBackground: {
    position: "relative",
    borderRadius: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    padding: 20,
    marginVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 5,
    borderColor: Color.appDefaultColor,
  },
  packageHeader: {
    alignItems: "center",
    marginBottom: 10,
  },
  packageName: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 2,
    backgroundColor: Color.appDefaultColor,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginTop: 15,
  },
  packagePriceContainer: {
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  priceWrapper: {
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  packagePrice: {
    fontSize: 16,
    fontWeight: "400",
    color: "#fff",
  },
  packageSubtitle: {
    fontSize: 14,
    color: "#fff",
  },
  servicesList: {
    marginBottom: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 15,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    maxWidth: "90%",
  },
  serviceIcon: {
    marginRight: 10,
  },
  serviceText: {
    fontSize: 15,
    color: Color.colorDarkgray,
    fontFamily: FontFamily.poppinsRegular,
    textDecorationLine: "underline",
  },
  subscribeButton: {
    backgroundColor: Color.appDefaultColor,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  subscribeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  arrowButton: {
    position: "absolute",
    zIndex: 1,
    top: "50%",
    marginTop: -20, // Centers the arrow vertically
  },
  leftArrow: {
    left: 10, // Position the left arrow slightly inside the card
  },
  rightArrow: {
    right: 10, // Position the right arrow slightly inside the card
  },
});
