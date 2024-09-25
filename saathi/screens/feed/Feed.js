import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import Icon from "@expo/vector-icons/Ionicons";
import { Color, FontFamily, height, width } from "../../GlobalStyles";
import cityRide from "../../assets/imgs/cityride.png";
import rental from "../../assets/imgs/rental.png";
import rides from "../../assets/imgs/rides.png";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import airportRides from "../../assets/imgs/airpotrides.png";
import scheduleRides from "../../assets/imgs/schedulerides.png";
import Cooking from "../../assets/imgs/cooking.svg";
import Packages from "../../components/feedComponents/Packages";
import ServicesTaken from "../../components/feedComponents/ServicesTaken";
import { StatusBar } from "expo-status-bar";
import ServiceSelector from "../service/Service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Accordion from "../../components/Accordion";
import { useFocusEffect } from "@react-navigation/native";
import Divider from "../../components/Divider";
import { useSelector } from "react-redux";

const Feed = () => {
  const currentRef = useRef(0);
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);
  useEffect(() => {
    const fetchData = async () => {
      const fet = await fetch(
        `https://saathi.etheriumtech.com:444/Saathi/subscribers/active`
      );
      const json = await fet.json();
      console.log("log of feed",json);
    };
    fetchData();
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

  const [mail, setMail] = useState();
  const profile = useSelector((state) => state.profile.data || {});
  useEffect(() => {
    const fetch = async () => {
      const mail = await AsyncStorage.getItem("Email");
      console.log("My Mail", mail);
      setMail(mail);
    };
    fetch();
  }, []);
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

  const TestimonialItem = ({ item }) => (
    <View style={{ flex: 1, width: width * 0.95 }}>
      <View style={styles.testimonialContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.feedback}>"{item.feedback}"</Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: item.rating }).map((_, index) => (
              <Icon key={index} name="star" size={20} color="#FFD700" />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
  return (
    <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
      <StatusBar style="dark" />

      {/* <ServiceSelector/> */}
      {Object.keys(profile).length !== 0 && <ServicesTaken />}
      {Object.keys(profile).length === 0 && <Packages />}

      {/* {Object.keys(profile).length !== 0 && <ServiceSelector />} */}
      {/* <View style={styles.exploreButtons}>
        {exploreOptions.map((option, index) => (
          <TouchableOpacity key={index} style={styles.exploreButton}>
            <Image
              source={option.icon}
              style={{
                resizeMode: "contain",
                height: height * 0.07,
                width: width * 0.07,
              }}
            />
            <Text style={styles.exploreButtonText}>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </View> */}

      {Object.keys(profile).length === 0 && (
        <View>
          <Text style={styles.mainTitle}>Testimonials</Text>
          <FlatList
            data={testimonials}
            ref={flatListRef}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TestimonialItem item={item} />}
            contentContainerStyle={styles.listContainer}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
          {/* <View style={{ flexDirection: "row", alignSelf: "center" }}>
          {testimonials.map((item, index) => {
            return <View style={styles.dot} />;
          })}
        </View> */}
        </View>
      )}
    </ScrollView>
  );
};

export default Feed;
const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
    margin: 5,
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
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  card: {
    backgroundColor: Color.lightOrange,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    lineHeight: 20,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "right",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "left",
    marginVertical: 10,
    color: "#1F2937",
    paddingHorizontal: 10,
  },
  exploreButton: {
    width: width * 0.27,
    height: height * 0.1,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  exploreTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
    color: "#4A4A4A",
    lineHeight: 21,
    fontFamily: FontFamily.poppinsRegular,
  },
  exploreTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
    color: "#4A4A4A",
    lineHeight: 21,
    fontFamily: FontFamily.poppinsRegular,
  },
  exploreButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#595959",
    margin: 8,
  },
});
