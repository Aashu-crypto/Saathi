import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import CompanionCard from "../../../components/CompanionCard";
import HeaderComponent from "../../../components/HeaderComponent";
import RatingModal from "../../../components/RatingModal";
import { BACKEND_HOST } from "../../../config";
import { useSelector } from "react-redux";

const Saathi = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true); // Loader state
  const [saathi, setSaathi] = useState(null);
  const profile = useSelector((state) => state.profile.data);
  const id = profile?.subscriberID;
  console.log("id", id);

  useEffect(() => {
    const fetchSaathiData = async () => {
      try {
        const response = await fetch(
          `${BACKEND_HOST}/subscribers/${id}/saathi`
        );

        const data = await response.json();
        setSaathi(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert(
          "Error",
          "An error occurred while fetching the data. Please try again later."
        );
      } finally {
        setLoading(false); // Hide loader when data fetching is done
      }
    };

    fetchSaathiData();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loaderText}>Loading your Saathi's details...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {saathi ? (
        <CompanionCard
          companion={{
            FirstName: saathi.firstName || "N/A",
            LastName: saathi.lastName || "N/A",
            Email: saathi.email || "N/A",
            DOB: saathi.dob || "N/A",
            ContactNo: saathi.contactNo || "N/A",
            CountryCode: saathi.countryCode || "+91", // Assuming default country code
            BriefBio: saathi.briefBio || "No bio available",
            Picture: saathi.picture, // Fallback to placeholder image
            UserType: saathi.userType || "Caregiver",
          }}
        />
      ) : (
        <View style={styles.noSaathiContainer}>
          <Text style={styles.noSaathiText}>No Saathi details available.</Text>
        </View>
      )}
      {/* Uncomment and handle the modal logic here if needed */}
      {/* <Pressable onPress={() => setModal(true)}>
        <Text>Rate your Saathi</Text>
      </Pressable> */}
      {modal && <RatingModal />}
    </SafeAreaView>
  );
};

export default Saathi;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#000",
  },
  noSaathiContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noSaathiText: {
    fontSize: 18,
    color: "#1F2937",
  },
});
