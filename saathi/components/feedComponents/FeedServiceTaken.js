import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { FontFamily, Color } from "../../GlobalStyles";
import { BACKEND_HOST } from "../../config";
import { Card, Title, Paragraph, Divider } from "react-native-paper";
import ContentLoader from "../ContentLoader";

const { width } = Dimensions.get("window");

const FeedServiceTaken = () => {
  const [request, setRequest] = useState([]);
  const [feedData, setFeedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const profile = useSelector((state) => state.profile.data);
  const status = useSelector((state) => state.status.status);

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
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

  // Fetch data on mount or whenever profile/status changes
  useEffect(() => {
    const fetchData = async () => {
      if (profile?.subscriberID) {
        setLoading(true);
        try {
          const [subscriberResponse, servicesResponse] = await Promise.all([
            fetch(`${BACKEND_HOST}/subscribers/${profile.subscriberID}`),
            fetch(
              `${BACKEND_HOST}/subscribers/${profile.subscriberID}/services`
            ),
          ]);

          const subscriberData = await subscriberResponse.json();
          const servicesData = await servicesResponse.json();

          setFeedData(subscriberData);

          // Flatten the services array to a single array of interactions
          const flattenedData = servicesData.reduce((acc, service) => {
            const { serviceName, interactions } = service;
            interactions.forEach((interaction) => {
              acc.push({ serviceName, ...interaction });
            });
            return acc;
          }, []);

          setRequest(flattenedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [profile, status]);

  // Render each card in the FlatList
  const renderServiceCard = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        {/* Top Section: background color, image (or placeholder), stars, and date */}
        <View style={styles.topSection}>
          {/* Show item.documents if valid; otherwise a placeholder image */}
          {typeof item.documents === "string" &&
            item.documents.trim() !== "" && (
              <Image
                source={{ uri: item.documents }}
                style={styles.topImage}
                resizeMode="contain"
              />
            )}

          <View style={styles.topFooterRow}>
            {/* Static 4/5 star rating to mimic the screenshot */}
            <View style={styles.starContainer}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.star}>☆</Text>
            </View>
            <Text style={styles.dateText}>{formatDate(item.createdDate)}</Text>
          </View>
        </View>

        {/* Bottom Section: service name/title and description */}
        <View style={styles.bottomSection}>
          <Text style={styles.titleText}>
            {item.serviceName || "Regular Check-In"}
          </Text>
          <Text style={styles.descriptionText}>
            {item.description ||
              "Write details - lorem ep sum lorem ep sum lorem ep sum..."}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return <ContentLoader />;
  }

  return (
    <View style={styles.container}>
      {request.length === 0 ? (
        // If no requests, show user subscription & Saathi details
        <ScrollView style={styles.scrollContainer}>
          {feedData && (
            <>
              {/* Optionally show the user's profile details */}
              {/* <ProfileCard feedData={feedData} /> */}

              <SubscriptionDetailsCard feedData={feedData} />
              {feedData.saathi && (
                <SaathiDetailsCard saathi={feedData.saathi} />
              )}
            </>
          )}
        </ScrollView>
      ) : (
        // Otherwise, show the FlatList of service interactions
        <FlatList
          data={request}
          renderItem={renderServiceCard}
          keyExtractor={(item) => item.interactionID.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const ProfileCard = ({ feedData }) => (
  <Card style={styles.infoCard}>
    <Card.Content>
      <Title style={styles.name}>
        {feedData.firstName} {feedData.lastName}
      </Title>
      <Paragraph style={styles.email}>{feedData.email}</Paragraph>
      <Paragraph style={styles.contact}>
        Contact: {feedData.contactNo}
      </Paragraph>
      <Paragraph style={styles.bio}>{feedData.briefBio}</Paragraph>
    </Card.Content>
  </Card>
);

const SubscriptionDetailsCard = ({ feedData }) => (
  <Card style={styles.infoCard}>
    <Card.Content>
      <Title style={styles.sectionTitle}>Subscription Details</Title>
      <Divider style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.label}>Package:</Text>
        <Text style={styles.value}>{feedData.packageName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Price (USD):</Text>
        <Text style={styles.value}>${feedData.priceUSD}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Price (INR):</Text>
        <Text style={styles.value}>₹{feedData.priceINR}</Text>
      </View>
    </Card.Content>
  </Card>
);

const SaathiDetailsCard = ({ saathi }) => (
  <Card style={styles.infoCard}>
    <Card.Content>
      <Title style={styles.sectionTitle}>Saathi Details</Title>
      <View style={styles.header}>
        {/* Example: If you have a picture for saathi, you can uncomment this:
          <Image source={{ uri: saathi.picture }} style={styles.profileImage} />
        */}
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {saathi.firstName} {saathi.lastName}
          </Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{saathi.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Contact:</Text>
          <Text style={styles.value}>{saathi.contactNo}</Text>
        </View>
        {saathi.briefBio && (
          <View style={styles.row}>
            <Text style={styles.label}>Bio:</Text>
            <Text style={styles.value}>{saathi.briefBio}</Text>
          </View>
        )}
      </View>
    </Card.Content>
  </Card>
);

export default FeedServiceTaken;

const styles = StyleSheet.create({
  /* Main container */
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    padding: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  /* Card layout (top + bottom sections) */
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Android elevation
    elevation: 3,
    overflow: "hidden",
  },
  topSection: {
    backgroundColor: Color.lightOrange, // e.g. "#FBE4C8"
    paddingVertical: 20,
    alignItems: "center",
  },
  topImage: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  topFooterRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 8,
  },
  starContainer: {
    flexDirection: "row",
  },
  star: {
    fontSize: 20,
    color: "#FFA500", // star color
    marginRight: 2,
  },
  dateText: {
    fontSize: 14,
    color: Color.colorDarkslategray,
    fontWeight: "500",
  },

  bottomSection: {
    padding: 16,
  },
  titleText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorDarkslategray,
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkgray,
    lineHeight: 20,
  },

  /* Cards for Subscription, Saathi, Profile, etc. */
  infoCard: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3,
    overflow: "hidden",
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FontFamily.poppinsBold,
    color: Color.appDefaultColor,
    marginBottom: 10,
  },
  divider: {
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: {
    fontWeight: "bold",
    color: Color.colorGray_100,
    maxWidth: "45%",
  },
  value: {
    color: Color.colorDarkslategray,
    maxWidth: "55%",
  },

  /* Profile & Saathi details */
  name: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorDarkslategray,
  },
  email: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorGray_100,
    marginBottom: 5,
  },
  contact: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorGray_100,
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkgray,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameContainer: {
    flex: 1,
  },
  profileImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    marginRight: 15,
  },
});
