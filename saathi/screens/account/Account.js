import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { Color, FontFamily, width } from "../../GlobalStyles";
import HeaderComponent from "../../components/HeaderComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../components/UserPic";
import { useDispatch, useSelector } from "react-redux";
import { screen } from "../../Redux/Slice/screenNameSlice";
import { Route } from "../../routes";
import Divider from "../../components/Divider";
import { profileData } from "../../Redux/Slice/ProfileDataSlice";
import { BACKEND_HOST } from "../../config";
import { isLoaded } from "expo-font";
import ContentLoader from "../../components/ContentLoader";
import AntDesign from "@expo/vector-icons/AntDesign";
const Account = ({ navigation }) => {
  const profileOptionsData = [
    {
      title: "Your Saathi",
      route: Route.YOURSAATHI,
      content: "Details about Your Saathi.",
      type: "saathi", // Identifier for Saathi content
    },
    {
      title: "Your Packages",
      route: Route.YOURPACKAGES,
      content: "Packages you have chosen.",
      type: "package", // Identifier for Package content
    },
  ];
  const [isLoaded, setIsLoaded] = useState();
  const [mail, setMail] = useState();
  const [openAccordions, setOpenAccordions] = useState(
    new Array(profileOptionsData.length).fill(false)
  );

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data || {});

  useEffect(() => {
    if (Object.keys(profile).length === 0) {
      dispatch(screen(Route.LOGIN));
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const mail = await AsyncStorage.getItem("Email");
      setMail(mail);
    };
    fetch();
  }, []);

  const toggleAccordion = (index) => {
    setOpenAccordions((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  const [saathiData, setSaathiData] = useState();
  const [packageData, setPackageData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      console.log("profile", profile);

      if (Object.keys(profile).length !== 0) {
        setIsLoaded(false);
        try {
          const response = await fetch(
            `${BACKEND_HOST}/subscribers/${profile.subscriberID}`
          );

          // First, check the response status
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // Log the response as text to see its format
          const textResponse = await response.text();
          console.log("Raw response text:", textResponse);

          // Try to parse the text response as JSON
          const json = JSON.parse(textResponse);
          console.log("json", json);

          setSaathiData(json.saathi);
          setPackageData(json);
          setIsLoaded(true);
        } catch (error) {
          console.error("Error:", error);
          Alert.alert(
            "Error Occurred",
            error.message || "Unknown error occurred"
          );
        }
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <User />
          {profile && Object.keys(profile).length !== 0 ? (
            <View>
              <Text style={styles.profileName}>
                {profile.firstName} {profile.lastName}
              </Text>
              <Text style={styles.infoText}>{profile.email}</Text>
            </View>
          ) : (
            <Pressable
              style={styles.signInButton}
              onPress={() => {
                dispatch(screen(Route.LOGIN));
              }}
            >
              <Text style={styles.signInText}>Sign In/Sign Up</Text>
            </Pressable>
          )}
        </View>

        {/* Settings Header */}
        <Text style={styles.settingsHeader}>Settings</Text>

        {/* Accordion Sections */}

        {isLoaded ? (
          profileOptionsData.map((item, index) => (
            <View key={item.title}>
              <TouchableOpacity onPress={() => toggleAccordion(index)}>
                <View style={styles.titleView}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  {/* Optionally, add an icon to indicate expandable content */}
                  <AntDesign name="down" size={24} color="black" />
                </View>
              </TouchableOpacity>

              {openAccordions[index] && (
                <View style={styles.accordionContent}>
                  {item.type === "saathi" && saathiData ? (
                    <View style={styles.saathiCardContainer}>
                      {/* <Text style={styles.detailTitle}>Saathi Details</Text> */}

                      <View style={styles.saathiImageContainer}>
                        {saathiData.picture && (
                          <Image
                            source={{ uri: saathiData.picture }}
                            style={styles.saathiImage}
                          />
                        )}
                      </View>

                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Name:</Text>
                        <Text style={styles.detailValue}>
                          {saathiData.firstName} {saathiData.lastName}
                        </Text>
                      </View>

                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Email:</Text>
                        <Text style={styles.detailValue}>
                          {saathiData.email}
                        </Text>
                      </View>

                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Contact No:</Text>
                        <Text style={styles.detailValue}>
                          {saathiData.contactNo}
                        </Text>
                      </View>

                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Bio:</Text>
                        <Text style={styles.detailValue}>
                          {saathiData.briefBio}
                        </Text>
                      </View>
                    </View>
                  ) : item.type === "package" && packageData ? (
                    <View style={styles.detailContainer}>
                      {/* <Text style={styles.detailTitle}>Package Details</Text> */}
                      <View style={styles.detailRow}>
                        <Text
                          style={[
                            styles.detailLabel,
                            { marginLeft: 100, fontSize: 22, marginBottom: 20 },
                          ]}
                        >
                          {packageData.packageName}
                        </Text>
                      </View>

                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Services :</Text>
                      </View>

                      {/* Loop through packageServices to display services included */}
                      {packageData?.packageServices?.map((service) => {
                        // Filter non-ala carte services from the services array
                        const nonAlaCarteService = packageData.services.find(
                          (s) =>
                            s.serviceID === service.serviceID && !s.alaCarte
                        );

                        return (
                          <Pressable
                            key={service.packageServiceID}
                            style={styles.serviceRow}
                            onPress={() => {
                              navigation.navigate(Route.SERVICE_STACK);
                            }}
                          >
                            <Text style={styles.serviceBullet}>•</Text>
                            <Text style={styles.serviceText}>
                              {service.serviceName}
                            </Text>

                            {/* Display pending status for non-ala carte services */}
                            {nonAlaCarteService && (
                              <View
                                style={{
                                  flex: 1,
                                  alignSelf: "flex-end",
                                  alignItems: "flex-end",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Text style={styles.pendingStatus}>
                                  {nonAlaCarteService.completions} of{" "}
                                  {nonAlaCarteService.pending +
                                    nonAlaCarteService.completions}{" "}
                                  completed
                                </Text>
                              </View>
                            )}
                          </Pressable>
                        );
                      })}

                      <View
                        style={{
                          backgroundColor: Color.appDefaultColor,
                          alignItems: "center",
                          borderRadius: 20,
                          padding: 10,
                          marginTop: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontFamily: FontFamily.poppinsRegular,
                            fontWeight: "400",
                          }}
                        >
                          Upgrade Your Package
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <Text>{item.content}</Text>
                  )}
                </View>
              )}

              {/* Divider */}
              <Divider />
            </View>
          ))
        ) : (
          <ContentLoader />
        )}

        {/* Logout Button */}
        {Object.keys(profile).length !== 0 && (
          <Pressable
            onPress={async () => {
              await AsyncStorage.removeItem("Email");
              dispatch(profileData([]));
              dispatch(screen(Route.LOGIN));
              // Optionally, reset the navigation stack to prevent going back
              navigation.reset({
                index: 0,
                routes: [{ name: Route.LOGIN }],
              });
            }}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginVertical: 15,
  },
  profileName: {
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 25,
    marginLeft: 14,
    fontWeight: "500",
    letterSpacing: 1,
    width: "auto",
  },
  infoText: {
    color: Color.colorGray,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 15,
  },
  signInButton: {
    backgroundColor: Color.lightpurple,
    borderRadius: 15,
    borderColor: Color.appDefaultColor,
    borderWidth: 1,
    padding: 15,
  },
  signInText: {
    fontSize: 16,
    fontWeight: "400",
    width: width / 1.8,
    textAlign: "center",
    fontFamily: FontFamily.poppinsRegular,
    textDecorationLine: "underline",
    color: Color.colorDarkslategray,
  },
  settingsHeader: {
    fontSize: 25,
    color: Color.colorDarkslategray,
    fontWeight: "600",
    marginVertical: 10,
  },
  titleView: {
    height: 57,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginVertical: 5,
  },
  titleText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray,
  },
  accordionContent: {
    padding: 15,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  saathiCardContainer: {
    backgroundColor: Color.lavender,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Color.appDefaultColor,
  },
  saathiImageContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  saathiImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: Color.colorGray,
  },
  detailContainer: {
    backgroundColor: Color.lavender,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 15,
    borderColor: Color.appDefaultColor,
    borderWidth: 1,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Color.colorDarkslategray,
    textAlign: "center",
    marginBottom: 15,
    textDecorationLine: "underline",
    textDecorationColor: Color.appDefaultColor,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  detailLabel: {
    fontWeight: "bold",
    fontSize: 16,
    color: Color.colorDarkslategray,
  },
  detailValue: {
    fontWeight: "400",
    color: Color.colorGray,
    fontSize: 14,
    flexShrink: 1,
  },
  pendingStatus: {
    marginLeft: 30,
    fontSize: 14,
    color: Color.colorGray,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 5,
  },
  serviceBullet: {
    fontSize: 12,
    marginRight: 5,
    color: Color.colorDarkslategray,
  },
  serviceText: {
    fontSize: 14,
    color: Color.colorDarkslategray,
    textDecorationLine: "underline",
  },
  saathiImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  logoutButton: {
    height: 57, // Same height as the other options

    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9", // Same background color as the other options
    borderRadius: 8,
    marginVertical: 5, // Same margin as the other options
  },
  logoutText: {
    fontSize: 16, // Same font size as other options
    lineHeight: 24, // Same line height
    fontWeight: "500", // Same font weight
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray, // Same color as other titles
  },
});
