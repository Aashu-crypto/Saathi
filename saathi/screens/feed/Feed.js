import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import Icon from "@expo/vector-icons/Ionicons";
import { Color, FontFamily, height, width } from "../../GlobalStyles";
import cityRide from "../../assets/imgs/cityride.png";
import rental from "../../assets/imgs/rental.png";
import rides from "../../assets/imgs/rides.png";
import airportRides from "../../assets/imgs/airpotrides.png";
import scheduleRides from "../../assets/imgs/schedulerides.png";
const Feed = () => {
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
      description: `• 1 hour call every week with call records in "My Feed"\n• 1 house visit for health check and well-being\n• Digital media uploaded to "My Feed"\n`,
      price: "$30/m (Rs. 2500/m)",
      icon: "star-outline",
      colors: ["#6a11cb", "#2575fc"],
    },
    {
      id: "2",
      title: "Bronze",
      description: `• 1 hour call every week with call records in "My Feed"\n• 2 house visits for health check and well-being\n• Upto 2 hours of running errands\n• Digital media uploaded to "My Feed"\n`,
      price: "$40/m (Rs. 3500/m)",
      icon: "medal-outline",
      colors: ["#ff9966", "#ff5e62"],
    },
    {
      id: "3",
      title: "Silver",
      description: `• 1 hour call every week with call records in "My Feed"\n• Weekly house visits for health check and well-being\n• Upto 4 hours of running errands\n• Driving patrons (upto 2) to a destination and back within 4 hours\n• Digital media uploaded to "My Feed"\n`,
      price: "$60/m (Rs. 5000/m)",
      icon: "trophy-outline",
      colors: ["#C9D6FF", "#E2E2E2"],
    },
    {
      id: "4",
      title: "Gold",
      description: `• 1 hour call every week with call records in "My Feed"\n• Weekly house visits for health check and well-being\n• Upto 8 hours of running errands\n• Driving patrons (upto 2) to a destination and back within 4 hours twice a month\n• Digital media uploaded to "My Feed"\n`,
      price: "$80/m (Rs. 6500/m)",
      icon: "ribbon-outline",
      colors: ["#f4c4f3", "#fc67fa"],
    },
  ];
  const exploreOptions = [
    { name: "City Rides", icon: cityRide },
    { name: "Home Visit", icon: rental },
    { name: "Shared Rides", icon: rides },
    { name: "Lugage", icon: airportRides },
    { name: "Errands", icon: scheduleRides },
  ];
  const SubscriptionCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title} Package</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );
  const TestimonialItem = ({ item }) => (
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
  );
  return (
    <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
      <HeaderComponent title={"FEED"} />
      <View>
        <Text style={styles.mainTitle}>Testimonials</Text>
        <FlatList
          data={testimonials}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TestimonialItem item={item} />}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      <Text style={styles.mainTitle}>Checkout Our Packages</Text>
      <FlatList
        data={packages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SubscriptionCard item={item} />}
        contentContainerStyle={styles.listContainer}
      />
      <Text style={styles.mainTitle}>Explore our services</Text>
      <View style={styles.exploreButtons}>
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
      </View>
    </ScrollView>
  );
};

export default Feed;
const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  testimonialContainer: {
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    backgroundColor: Color.lightOrange,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
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
    color: "#333",
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
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
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
});
