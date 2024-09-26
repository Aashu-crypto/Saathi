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

import Icon from "@expo/vector-icons/Ionicons";
import { Color, FontFamily, height, width } from "../../GlobalStyles";

import ServicesTaken from "../../components/feedComponents/ServicesTaken";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";

import { useSelector } from "react-redux";
import HomeScreen from "../../components/feedComponents/HomeScreen";

const Feed = () => {
  const currentRef = useRef(0);
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  const testimonials = [
    {
      id: "4",
      name: "Rahul Mehra",
      feedback:
        "Saathi has made it so much easier to stay connected with my parents back home. The service is seamless and truly valuable.",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 5,
    },
    {
      id: "5",
      name: "Priya Reddy",
      feedback:
        "I love how Saathi ensures my grandparents are well taken care of. The weekly updates give me peace of mind.",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      rating: 4,
    },
    {
      id: "6",
      name: "Suresh Nair",
      feedback:
        "The personalized care and attention Saathi provides to my parents is unparalleled. Highly recommended!",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      rating: 5,
    },
    {
      id: "7",
      name: "Meenal Sharma",
      feedback:
        "It’s a blessing to have a service like Saathi for my elderly parents. The app is user-friendly and efficient.",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      rating: 4,
    },
    {
      id: "8",
      name: "Amit Roy",
      feedback:
        "Thanks to Saathi, I no longer worry about my parents' well-being. They get the support they need, and I stay informed!",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
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

  return (
    <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
      <StatusBar style="dark" />

      {/* <ServiceSelector/> */}

      {Object.keys(profile).length !== 0 &&
        (profile.billingStatus === 0 ? <HomeScreen /> : <ServicesTaken />)}

      {Object.keys(profile).length === 0 && profile?.billingStatus === 0 && (
        <HomeScreen />
      )}

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

      {/* {Object.keys(profile).length === 0 && (
      
      )} */}
    </ScrollView>
  );
};

export default Feed;
const styles = StyleSheet.create({});
