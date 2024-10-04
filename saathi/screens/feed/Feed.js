import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

import ServicesTaken from "../../components/feedComponents/ServicesTaken";
import { StatusBar } from "expo-status-bar";

import { useSelector } from "react-redux";
import HomeScreen from "../../components/feedComponents/HomeScreen";
import { BACKEND_HOST } from "../../config";

const Feed = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const profile = useSelector((state) => state.profile.data || {});
  const status = useSelector((state) => state.status.status);
  console.log(status);

  const [subscriberData, setSubscriberData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(true);
      try {
        const response = await fetch(
          `${BACKEND_HOST}/subscribers/${profile.subscriberID}`
        );
        if (!response.ok) {
          const errorMessage = await response.text(); // Get error response message
          Alert.alert(
            "Error Fetching Information",
            errorMessage || "Unknown error occurred"
          );
          return;
        }
        const json = await response.json();
        setSubscriberData(json);
      } catch (error) {
        Alert.alert(
          "Network Error",
          "Unable to fetch data. Please check your connection."
        );
        console.log(error);
      } finally {
        setIsLoaded(false);
      }
    };
    if (Object.keys(profile).length !== 0) {
      fetchData();
    }
  }, [profile]);

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <StatusBar style="dark" />

      {/* {Object.keys(profile).length !== 0 &&
        !isLoaded &&
        subscriberData &&
        (status !== 0 ? (
          <HomeScreen />
        ) : (
          <ServicesTaken />
        ))} */}

      <HomeScreen />
    </View>
  );
};

export default Feed;
const styles = StyleSheet.create({});
