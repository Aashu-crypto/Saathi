import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Color, FontFamily, width } from "../../GlobalStyles";
import { useSelector, useDispatch } from "react-redux";
import { screen } from "../../Redux/Slice/screenNameSlice";
import { subscriptionPackages } from "../../Redux/Slice/packageSlice";
import Accordion from "../Accordion";
import AllCuresBlog from "./AllCuresBlog";
import MemberShipBenefits from "./MemberShipBenefits";
import Testimonials from "./Testimonials";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  const profile = useSelector((state) => state.profile.data);
  const flatListRef = useRef(null); // Reference to the FlatList for manual scrolling
  const [scrollIndex, setScrollIndex] = useState(0); // Keep track of the current scroll position

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          "https://saathi.etheriumtech.com:444/Saathi/subscription-package/active"
        );
        const data = await response.json();
        dispatch(subscriptionPackages(data));

        if (Array.isArray(data)) {
          setPackages(data);
        } else {
          setError("Unexpected data format from the server.");
        }
      } catch (error) {
        setError("Error fetching packages. Please try again later.");
      }
    };
    fetchPackages();
  }, [dispatch]);

  const handleSubscribe = (item) => {
    dispatch(screen("LOGIN"));
  };

  // Scroll to the next or previous item
  const scrollToIndex = (index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setScrollIndex(index);
    }
  };

  const renderPackageItem = ({ item }) => (
    <View style={styles.packageCard}>
      <View style={styles.packageHeader}>
        <Ionicons
          name="pricetag-outline"
          size={24}
          color={Color.appDefaultColor}
        />
        <Text style={styles.packageName}>{item.packageName}</Text>
      </View>
      <View style={styles.servicesList}>
        {item.packageServices.map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={Color.appDefaultColor}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceText}>
              {service.serviceName}{" "}
              <Text style={styles.serviceFrequency}>
                ({service.frequency} times per month)
              </Text>
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.packageFooter}>
        <Text style={styles.packagePrice}>
          {item.priceUSD ? `$${item.priceUSD}` : `₹${item.priceINR}`}
        </Text>
        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={() => handleSubscribe(item)}
        >
          <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
          <AntDesign name="right" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.introText}>
        Saathi provides a wide range of services to make life easier for your
        loved ones and give you peace of mind.
      </Text>
      <MemberShipBenefits />
      <Accordion />
     

      <Text style={styles.sectionTitle}>Explore our Packages</Text>

      <View style={styles.flatListContainer}>
        {/* Left Arrow */}
        {scrollIndex > 0 && (
          <TouchableOpacity
            style={styles.leftArrow}
            onPress={() => scrollToIndex(scrollIndex - 1)}
          >
            <Ionicons name="chevron-back" size={30} color="gray" />
          </TouchableOpacity>
        )}

        {/* Horizontal FlatList */}
        <View style={styles.flatListWrapper}>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <FlatList
              data={packages}
              renderItem={renderPackageItem}
              keyExtractor={(item) => item.packageID.toString()}
              contentContainerStyle={styles.packageList}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              decelerationRate="fast"
              ref={flatListRef} // Attach FlatList ref
              snapToInterval={width * 0.9 + 20} // Adjust to card width + margin
              onScroll={(e) => {
                const offsetX = e.nativeEvent.contentOffset.x;
                const index = Math.round(offsetX / (width * 0.9 + 20));
                setScrollIndex(index); // Set the current scroll index
              }}
            />
          )}
        </View>

        {/* Right Arrow */}
        {scrollIndex < packages.length - 1 && (
          <TouchableOpacity
            style={styles.rightArrow}
            onPress={() => scrollToIndex(scrollIndex + 1)}
          >
            <Ionicons name="chevron-forward" size={30} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.sectionTitle}>Cures from around the world</Text>
      <AllCuresBlog />
      <Testimonials />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  introText: {
    textAlign: "center",
    paddingHorizontal: 15,
    fontWeight: "400",
    color: Color.colorGray,
    borderRadius: 10,
    padding: 5,
    fontSize: 14,
    lineHeight: 15,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 20,
    color: Color.appDefaultColor,
    backgroundColor: Color.lightOrange,
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Color.appDefaultColor,
    marginHorizontal:10
  },
  flatListContainer: {
    position: "relative", // Required to position arrows absolutely
    flexDirection: "row", // Align arrows and flatlist horizontally
    alignItems: "center", // Align arrows and flatlist vertically
  },
  flatListWrapper: {
    flex: 1, // Allow the flatlist to take up the available space between arrows
    overflow: "visible", // Make sure content overflows aren't clipped
  },
  leftArrow: {
    position: "absolute",
    left: 0,
    zIndex: 1,
    padding: 10,
  },
  rightArrow: {
    position: "absolute",
    right: 0,
    zIndex: 1,
    padding: 10,
  },
  packageList: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  packageCard: {
    backgroundColor: "#d3d3e6",
    borderRadius: 15,
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 10, // Space between cards
    width: width * 0.9, // Ensure each card takes 90% of screen width
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    borderLeftWidth: 8,
    borderLeftColor: Color.appDefaultColor,
  },
  packageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  packageName: {
    fontSize: 22,
    marginLeft: 10,
    color: Color.colorDarkslategray,
  },
  servicesList: {
    marginBottom: 20,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  serviceIcon: {
    marginRight: 10,
  },
  serviceText: {
    fontSize: 16,
    color: "#333",
  },
  serviceFrequency: {
    fontSize: 13,
    color: Color.colorDarkslategray,
  },
  packageFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  packagePrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: Color.appDefaultColor,
  },
  subscribeButton: {
    backgroundColor: Color.appDefaultColor,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  subscribeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 5,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginVertical: 10,
  },
});
