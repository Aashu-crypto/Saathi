import React, { useRef, useEffect } from "react";
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
  const packages = [
    {
      id: "1",
      title: "Basic",
      description: `• One-hour call with patrons every week.\n• Includes one in-home visit to check health, take a photo, and ensure well-being.`,
      price: "$30/m\n(Rs. 2500/m)",
      icon: "star-outline",
      colors: ["rgba(186, 220, 188, 0.8)", "#4CAF50"], // Light mint green with dark green border
    },
    {
      id: "2",
      title: "Bronze",
      description: `• One-hour call with patrons every week.\n• Two in-home visits to check health, take a photo, and ensure well-being.`,
      price: "$40/m\n(Rs. 3500/m)",
      icon: "medal-outline",
      colors: ["rgba(255, 224, 178, 0.8)", "#FFA726"], // Soft peach with deep orange border
    },
    {
      id: "3",
      title: "Silver",
      description: `• One-hour call with patrons every week.\n• Weekly in-home visits to check health, take a photo, and ensure well-being.`,
      price: "$60/m\n(Rs. 5000/m)",
      icon: "trophy-outline",
      colors: ["rgba(178, 235, 242, 0.8)", "#00ACC1"], // Light aqua with dark teal border
    },
    {
      id: "4",
      title: "Gold",
      description: `• One-hour call with patrons every week.\n• Weekly in-home visits to check health, take a photo, and ensure well-being.`,
      price: "$80/m\n(Rs. 6500/m)",
      icon: "ribbon-outline",
      colors: ["rgba(244, 213, 178, 0.8)", "#FF9800"], // Light sand with burnt orange border
    },
  ];

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

  function Item({ index, scrollY, item }) {
    return (
      <View
        style={[
          styles.item,
          {
            backgroundColor: item.colors[0],
            borderLeftColor: item.colors[1],
            borderLeftWidth: 8,
            alignItems: "center",
          },
        ]}
      >
        <View style={styles.content}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>{item.title}</Text>
          </View>

          <View style={styles.divider} />
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.price}>{item.price}</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: item.colors[1] }]}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.buttonText}>Subscribe Now</Text>
            <AntDesign name="right" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
        horizontal
        renderItem={({ item, index }) => <Item index={index} item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        decelerationRate="fast"
        pagingEnabled
        showsHorizontalScrollIndicator="false"
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
    elevation: 8,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 10,

    letterSpacing: 1.2,
    textAlign: "left",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
    textAlign: "center",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    textAlign: "left",
    marginBottom: 20,
    lineHeight: 24,
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
    fontSize: 13,
    fontWeight: "600",

    letterSpacing: 1.1,
    textAlign: "center",
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
