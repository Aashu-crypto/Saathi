import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CompanionCard from "../../../components/CompanionCard";
import HeaderComponent from "../../../components/HeaderComponent";
import RatingModal from "../../../components/RatingModal";

const Saathi = () => {
  const [modal, setModal] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <HeaderComponent title={"Your Saathi"} />
      <CompanionCard
        companion={{
          FirstName: "John",
          LastName: "Doe",
          Email: "john.doe@example.com",
          DOB: "1985-05-15",
          ContactNo: "1234567890",
          CountryCode: "+1",
          BriefBio:
            "John is a dedicated professional with over 10 years of experience in caregiving services.",
          Picture: "https://randomuser.me/api/portraits/men/1.jpg",
          UserType: "Professional Caregiver",
        }}
      />
      {/* <Pressable>
        <Text>Rate your Saathi</Text>
      </Pressable> */}
      {modal && <RatingModal />}
    </SafeAreaView>
  );
};

export default Saathi;

const styles = StyleSheet.create({});
