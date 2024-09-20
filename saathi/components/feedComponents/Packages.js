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
  function Item({ item }) {
    return (
      <View
        style={[
          styles.item,
          {
            backgroundColor: "#fff",
            borderLeftColor: Color.appDefaultColor,
            borderLeftWidth: 8,
            alignItems: "center",
          },
        ]}
      >
        <View style={styles.content}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="pricetag-outline"
              size={20}
              color={Color.appDefaultColor}
              style={{ marginRight: 5 }}
            />
            <Text style={styles.title}>{item.packageName}</Text>
          </View>

          {item.packageServices.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Ionicons
                name="checkmark-circle-outline"
                size={16}
                color={Color.appDefaultColor}
              />
              <Text style={styles.serviceName}>
                {service.serviceName} ({service.frequency}x per month)
              </Text>
            </View>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.price}>
            {item.priceUSD
              ? `$${item.priceUSD.toFixed(2)}`
              : `₹${item.priceINR}`}
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Color.appDefaultColor }]}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.buttonText}>Subscribe Now</Text>
            <AntDesign name="right" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  const keyValues = [
    {
      icon: "heart-outline",
      title: "Companionship",
      color: "rgba(161, 214, 178, 0.4)",
      text: "Saathis are more than assistants – they're friends who reduce loneliness.",
    },
    {
      icon: "medkit-outline",
      title: "Professional Care",
      color: "rgba(206, 223, 159, 0.4)",
      text: "Our companions assist with conversations, tasks, and appointments.",
    },
    {
      icon: "shield-checkmark-outline",
      title: "Trust and Reliability",
      color: "rgba(241, 243, 194, 0.4)",
      text: "We keep you informed so you know your family is in good hands.",
    },
    {
      icon: "chatbubble-ellipses-outline",
      title: "Effective Communication",
      color: "rgba(232, 180, 184, 0.4)",
      text: "Clear, compassionate communication in every interaction.",
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
          textAlign: "left",
          paddingHorizontal: 15,
          fontWeight: "400",
          color: Color.colorDarkslategray,

          borderRadius: 10,
          padding: 5,
          borderColor: Color.appDefaultColor,
          fontSize: 15,
        }}
      >
        Saathi provides a wide range of services to make life easier for your
        loved ones and give you peace of mind. Whether it's providing emotional
        support, managing daily tasks, or making sure health needs are met, we
        are here to help.
      </Text>

      <Text style={styles.header}>Membership Benefits</Text>
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
                    color="#4A90E2"
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

      <Text style={styles.header}>Explore our Packages</Text>
      <FlatList
        data={packages}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.packageID}
        contentContainerStyle={styles.list}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      {Object.keys(profile).length === 0 && <Accordion />}
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
    fontSize: 22,
    fontWeight: "600",
    textAlign: "left",
    marginVertical: 20,
    color: "#1F2937",
  },
  list: {
    alignSelf: "center",
  },
  item: {
    flexDirection: "row",
    width: width * 0.95,
    borderRadius: 15,
    overflow: "hidden",
    marginVertical: 10,
    padding: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: 1.1,
    textAlign: "left",
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
    fontSize: 12,
    marginLeft: 10,
    color: "#333",
    width:'90%'
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
    fontSize: 15,
    fontWeight: "700",
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
