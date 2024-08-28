import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../GlobalStyles";

const CompanionCard = ({ companion }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Image source={{ uri: companion.Picture }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text
            style={styles.name}
          >{`${companion.FirstName} ${companion.LastName}`}</Text>
          <Text style={styles.email}>{companion.Email}</Text>
          <View style={styles.contactContainer}>
            <Ionicons
              name="call-outline"
              size={16}
              color={Color.appDefaultColor}
            />
            <Text
              style={styles.contactNo}
            >{`${companion.CountryCode} ${companion.ContactNo}`}</Text>
          </View>
          <Text style={styles.userType}>{companion.UserType}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Ionicons
          name="calendar-outline"
          size={16}
          color={Color.appDefaultColor}
        />
        <Text style={styles.dob}>{`DOB: ${companion.DOB}`}</Text>
      </View>

      <Text style={styles.briefBio} numberOfLines={3}>
        {companion.BriefBio}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "column",
    marginHorizontal: 10,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: Color.appDefaultColor,
    marginBottom: 2,
  },
  email: {
    fontSize: 16,
    color: Color.appDefaultColor,
    marginBottom: 4,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  contactNo: {
    fontSize: 16,
    color: Color.appDefaultColor,
    marginLeft: 5,
  },
  userType: {
    fontSize: 16,
    fontWeight: "bold",
    color: Color.appDefaultColor,
  },
  dob: {
    fontSize: 16,
    color: Color.appDefaultColor,
    marginBottom: 10,
  },
  briefBio: {
    fontSize: 15,
    color: Color.appDefaultColor,
    lineHeight: 22,
  },
});

export default CompanionCard;
