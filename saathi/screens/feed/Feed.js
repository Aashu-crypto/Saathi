import React from "react";
import { View, StyleSheet } from "react-native";

import ServicesTaken from "../../components/feedComponents/ServicesTaken";
import { StatusBar } from "expo-status-bar";

import { useSelector } from "react-redux";
import HomeScreen from "../../components/feedComponents/HomeScreen";

const Feed = () => {
  const profile = useSelector((state) => state.profile.data || {});

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <StatusBar style="dark" />

      {/* <ServiceSelector/> */}

      {Object.keys(profile).length !== 0 &&
        (profile.billingStatus === 0 ? <HomeScreen /> : <ServicesTaken />)}

      {Object.keys(profile).length === 0 && <HomeScreen />}

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
    </View>
  );
};

export default Feed;
const styles = StyleSheet.create({});
