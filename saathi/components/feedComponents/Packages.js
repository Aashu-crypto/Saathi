import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Color, FontFamily, height, width } from "../../GlobalStyles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { screen } from "../../Redux/Slice/screenNameSlice";
import { Route } from "../../routes";
import AntDesign from "@expo/vector-icons/AntDesign";
import Accordion from "../Accordion";
import { subscriptionPackages } from "../../Redux/Slice/packageSlice";
const itemWidth = width / 1.5;

const Packages = () => {
  const scrollY = useSharedValue(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % testimonials.length;

      if (flatListRef.current) {
        // Check if the ref is available
        flatListRef.current.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
      }
    }, 2500); // Auto-slide interval in milliseconds

    return () => clearInterval(interval); // Clear the interval on unmount
  }, []);
  const testimonials = [
    {
      id: "1",
      name: "John Doe",
      feedback:
        "This app has transformed the way I learn. The content is top-notch!",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 5,
    },
    {
      id: "2",
      name: "Jane Smith",
      feedback: "Absolutely love the interface. So easy to navigate and use!",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 4,
    },
    {
      id: "3",
      name: "Michael Johnson",
      feedback: "The customer service is excellent. Highly recommend this app.",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 5,
    },
  ];
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          "https://saathi.etheriumtech.com:444/Saathi/subscription-package/active"
        );
        const data = await response.json();
        dispatch(subscriptionPackages(data));
        // Check if data is an array and has valid content
        if (Array.isArray(data)) {
          setPackages(data);
        } else {
          console.error("Unexpected data format:", data);
          setError("Unexpected data format from the server.");
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
        setError("Error fetching packages. Please try again later.");
      }
    };
    fetchPackages();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        {/* Card Header */}
        <View style={styles.header}>
          <Ionicons
            name="pricetag-outline"
            size={24}
            color={Color.appDefaultColor}
          />
          <Text style={styles.packageName}>{item.packageName}</Text>
        </View>

        {/* Services List */}
        <View style={styles.servicesContainer}>
          {item.packageServices.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={Color.appDefaultColor}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.serviceText}>
                {service.serviceName}{" "}
                <Text style={styles.serviceFrequency}>
                  ({service.frequency} times per {service.frequencyUnit})
                </Text>
              </Text>
            </View>
          ))}
        </View>

        {/* Price and Subscribe Button */}
        <View style={styles.footer}>
          <Text style={styles.price}>
            {item.priceUSD
              ? `$${item.priceUSD.toFixed(2)}`
              : `₹${item.priceINR}`}
          </Text>
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.buttonText}>Subscribe Now</Text>
            <AntDesign name="right" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const keyValues = [
    {
      icon: "call-outline", // representing phone calls
      title: "Regular Check-ins",
      color: "rgba(161, 214, 178, 0.4)",
      text: "Weekly calls to ensure the well-being of your loved ones and keep you updated.",
    },
    {
      icon: "home-outline", // representing home visits
      title: "Home Visits",
      color: "rgba(206, 223, 159, 0.4)",
      text: "Scheduled visits to house check on your family and share updates.",
    },
    {
      icon: "bicycle-outline", // representing errands
      title: "Errand Assistance",
      color: "rgba(241, 243, 194, 0.4)",
      text: "Running essential errands on behalf of your loved ones to make their lives easier.",
    },
    {
      icon: "car-outline", // representing transportation
      title: "Destination Drive",
      color: "rgba(232, 180, 184, 0.4)",
      text: "Safe and reliable transportation for your loved ones to appointments and events.",
    },
  ];

  const profile = useSelector((state) => state.profile.data);
  const handlePress = () => {
    dispatch(screen(Route.LOGIN));
  };

  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          paddingHorizontal: 15,
          fontWeight: "400",
          color: Color.colorGray,

          borderRadius: 10,
          padding: 5,

          fontSize: 12,
          lineHeight: 15,
        }}
      >
        Saathi provides a wide range of services to make life easier for your
        loved ones and give you peace of mind.
      </Text>
      {Object.keys(profile).length === 0 && <Accordion />}
      <Text style={styles.headerText}>Membership Benefits</Text>
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          rowGap: 10,
        }}
      >
        {keyValues.map((item) => {
          return (
            <ImageBackground
              key={item.title}
              source={require("../../assets/imgs/flowerBackground.png")}
            >
              <View
                style={{
                  width: width / 2.3,
                  backgroundColor: item.color,
                  borderRadius: 20,
                  padding: 15,
                  height: height * 0.24,
                  rowGap: 10,
                  columnGap: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",

                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <Ionicons
                    name={item.icon}
                    size={14}
                    color={Color.appDefaultColor}
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.keyValueTitle}>{item.title}</Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "black",
                  }}
                >
                  {item.text}
                </Text>
              </View>
            </ImageBackground>
          );
        })}
      </View>

      <Text style={styles.headerText}>Explore our Packages</Text>
      <FlatList
        data={packages}
        renderItem={renderItem}
        keyExtractor={(item) => item.packageID.toString()}
        contentContainerStyle={styles.list}
      />
    </ScrollView>
  );
};

export default Packages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 20,
    color: Color.appDefaultColor,
    fontFamily: FontFamily.poppinsRegular,

    textDecorationColor: Color.appDefaultColor,
    backgroundColor: Color.lightOrange,
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Color.appDefaultColor,
    overflow: "hidden",
  },
  list: {
    alignSelf: "center",
  },
  introText: {
    textAlign: "center",
    paddingHorizontal: 15,
    fontWeight: "400",
    color: Color.colorGray,
    borderRadius: 10,
    padding: 5,
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 20,
    color: Color.appDefaultColor,
    fontFamily: FontFamily.poppinsRegular,
    backgroundColor: Color.lightOrange,
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Color.appDefaultColor,
  },
  list: {
    alignItems: "center",
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: "#d3d3e6",
    borderRadius: 15,
    padding: 20,
    marginVertical: 15,
    width: width * 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    borderLeftWidth: 8,
    borderLeftColor: Color.appDefaultColor,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  packageName: {
    fontSize: 22,
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorDarkslategray,
    marginLeft: 10,
  },
  servicesContainer: {
    marginBottom: 20,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  serviceText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsRegular,
    color: "#333",
  },
  serviceFrequency: {
    fontSize: 13,
    color: Color.colorDarkslategray,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: Color.appDefaultColor,
  },
  subscribeButton: {
    backgroundColor: Color.appDefaultColor,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 5,
  },
  item: {
    flexDirection: "row",
    width: width * 0.95,
    borderRadius: 15,
    overflow: "hidden",
    marginVertical: 10,
    paddingHorizontal: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // elevation: 5,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  packageName: {
    fontSize: 22,
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorDarkslategray,
    marginLeft: 10,
  },
  servicesContainer: {
    marginBottom: 20,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  serviceText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsRegular,
    color: "#333",
  },

  
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 5,
  },
  content: {
    flex: 1,

    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "300",
    color: Color.colorDarkslategray,
    marginBottom: 10,
    letterSpacing: 1.1,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    textAlign: "left",
    marginBottom: 10,
    lineHeight: 22,
  },
  servicesContainer: {
    marginTop: 15,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  serviceName: {
    fontSize: 13,
    marginLeft: 10,
    color: "#333",
    width: "90%",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 5,
  },
  keyValueTitle: {
    fontSize: 13,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "500",
  },
  testimonialContainer: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 10,
    backgroundColor: Color.lightOrange,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    width: "95%",
    marginHorizontal: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    marginLeft: 15,
    justifyContent: "center",
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: Color.appDefaultColor,
  },
  feedback: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: "row",
  },
});
