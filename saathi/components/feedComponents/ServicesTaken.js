import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { FontFamily, Color } from "../../GlobalStyles";
import { Divider } from "react-native-paper";
import { BACKEND_HOST } from "../../config";

/* screen dimension */
const { width, height } = Dimensions.get("window");

const ServicesTaken = () => {
  const [request, setRequest] = useState([]);
  const profile = useSelector((state) => state.profile.data);
  const [loading, setLoading] = useState(false);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    // Add "th", "st", "nd", "rd" suffix to the day
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    return `${day}${suffix} ${month} ${year}`;
  };
  useEffect(() => {
    const fetchRequests = async () => {
      if (profile.subscriberID !== 0) {
        const response = await fetch(
          `${BACKEND_HOST}/subscribers/${profile.subscriberID}/services`
        );
        const json = await response.json();
        const flattenedData = json.reduce((acc, service) => {
          const { serviceName, interactions } = service;
          interactions.forEach((interaction) => {
            acc.push({ serviceName, ...interaction });
          });
          return acc;
        }, []);
        setRequest(flattenedData);
      }
    };
    fetchRequests();
  }, [profile]);

  const renderComponent = ({ item }) => {
    return (
      <View>
        <View style={styles.cardContainer}>
          <View style={styles.cardContent}>
            <View style={styles.header}>
              <Text style={styles.date}>{formatDate(item.createdDate)}</Text>
            </View>
          </View>
          {/* Image Placeholder */}
          {item.documents && (
            <Image
              source={{ uri: item.documents }} // Add image URL here
              style={styles.cardImage}
              resizeMode="stretch"
            />
          )}
          <View style={{ padding: 10 }}>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
        <Divider />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feeds</Text>
      <FlatList
        data={request}
        renderItem={renderComponent}
        keyExtractor={(item) => item.interactionID.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ServicesTaken;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontFamily: FontFamily.poppinsBold, // Custom font
    marginBottom: 20,
    textAlign: "center",
    color: Color.appDefaultColor, // Custom color
    letterSpacing: 1,
  },
  list: {
    paddingBottom: 20,
    gap: 15,
  },
  cardContainer: {
    backgroundColor: Color.lightOrange,
    borderRadius: 15,

    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 4,
    marginBottom: 15,
    overflow: "hidden",
    borderLeftWidth: 4,
    borderColor: Color.appDefaultColor,
  },
  cardImage: {
    width: "100%",
    height: width * 0.4, // Responsive image height based on screen width
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cardContent: {
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsBold, // Custom font
    color: Color.colorDarkslategray, // Custom color
  },
  date: {
    fontSize: 14,
    color: Color.colorGray_100, // Custom color
    fontFamily: FontFamily.poppinsRegular, // Custom font
  },
  description: {
    fontSize: 14,
    color: Color.colorDarkgray, // Custom color
    marginTop: 8,
    fontFamily: FontFamily.poppinsRegular, // Custom font
  },
});
