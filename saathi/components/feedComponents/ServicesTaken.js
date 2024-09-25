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

/* screen dimension */
const { width, height } = Dimensions.get("window");

const ServicesTaken = () => {
  const [request, setRequest] = useState([]);
  const profile = useSelector((state) => state.profile.data);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      if (profile.subscriberID !== 0) {
        const response = await fetch(
          `https://saathi.etheriumtech.com:444/Saathi/subscribers/7/services`
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
      <View style={styles.cardContainer}>
        <View style={styles.cardContent}>
          <View style={styles.header}>
            <Text style={styles.serviceName}>{item.serviceName}</Text>
            <Text style={styles.date}>{item.createdDate}</Text>
          </View>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        {/* Image Placeholder */}
        <Image
          source={require('../../assets/imgs/1.jpeg')} // Add image URL here
          style={styles.cardImage}
          resizeMode="cover"
        />
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
    backgroundColor: "#f7f7f7",
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
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 15,
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

