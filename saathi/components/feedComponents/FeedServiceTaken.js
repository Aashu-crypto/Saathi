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
import { Card, Title, Paragraph, Button, Divider } from "react-native-paper";
import ContentLoader from "../ContentLoader";

const { width } = Dimensions.get("window");

const FeedServiceTaken = () => {
  const [request, setRequest] = useState([]);
  const [feedData, setFeedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const profile = useSelector((state) => state.profile.data);
  const status = useSelector((state) => state.status.status);
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

  const renderServiceCard = ({ item }) => (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.cardContent}>
          <View style={styles.header}>
            <Text style={styles.date}>{formatDate(item.createdDate)}</Text>
          </View>
        </View>
        {item.documents && (
          <Image
            source={{ uri: item.documents }}
            style={styles.cardImage}
            resizeMode="contain"
          />
        )}
        <View style={{ padding: 10 }}>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
      <Divider />
    </View>
  );

  if (loading) {
    return <ContentLoader />;
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Feeds</Text> */}
      {request.length === 0 ? (
        <ScrollView style={styles.scrollContainer}>
          {feedData && (
            <>
              {/* <ProfileCard feedData={feedData} /> */}
              <SubscriptionDetailsCard feedData={feedData} />
              {feedData.saathi && (
                <SaathiDetailsCard saathi={feedData.saathi} />
              )}
            </>
          )}
        </ScrollView>
      ) : (
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={request}
            renderItem={renderServiceCard}
            keyExtractor={(item) => item.interactionID.toString()}
            contentContainerStyle={styles.list}
          />
        </View>
      )}
    </View>
  );
};
1;

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
        {/* <Image source={{ uri: saathi.picture }} style={styles.profileImage} /> */}

        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {saathi.firstName} {saathi.lastName}
          </Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.detailsContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
          }}
        >
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{saathi.email}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
          }}
        >
          <Text style={styles.label}>Contact:</Text>
          <Text style={styles.value}>{saathi.contactNo}</Text>
        </View>

        {saathi.briefBio && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
              }}
            >
              <Text style={styles.label}>Bio:</Text>
              <Text style={styles.value}>{saathi.briefBio}</Text>
            </View>
          </>
        )}
      </View>
    </Card.Content>
  </Card>
);

export default FeedServiceTaken;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "center",
    color: Color.appDefaultColor,
    marginVertical: 20,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: Color.lightOrange,
    borderRadius: 15,

    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
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
    alignItems: "center",
    marginBottom: 15,
  },
  serviceName: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsBold,
    color: Color.appDefaultColor,
  },
  date: {
    fontSize: 14,
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.poppinsRegular,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    color: Color.colorDarkgray,
    marginTop: 8,
    fontFamily: FontFamily.poppinsRegular,
    fontWeight: "500",
  },
  infoCard: {
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 3,
    overflow: "hidden",
  },
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
  sectionTitle: {
    fontSize: 20,
    fontFamily: FontFamily.poppinsBold,
    color: Color.appDefaultColor,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: {
    fontWeight: "bold",
    color: Color.colorGray_100,
  },
  value: {
    color: Color.colorDarkslategray,
  },
  button: {
    marginVertical: 20,
    alignSelf: "center",
    backgroundColor: Color.appDefaultColor,
  },
  divider: {
    marginVertical: 10,
  },
  profileImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    marginRight: 15,
  },
  nameContainer: {
    flex: 1,
  },
  userType: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.appDefaultColor,
  },
});
