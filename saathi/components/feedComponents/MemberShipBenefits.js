import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Color, FontFamily, height, width } from "../../GlobalStyles";
const MemberShipBenefits = () => {
  const membershipBenefits = [
    {
      icon: "call-outline",
      title: "Regular Check-ins",
      color: "rgba(161, 214, 178, 0.4)",
      text: "Weekly calls to ensure the well-being of your loved ones and keep you updated.",
    },
    {
      icon: "home-outline",
      title: "Home Visits",
      color: "rgba(206, 223, 159, 0.4)",
      text: "Scheduled visits to house check on your family and share updates.",
    },
    {
      icon: "bicycle-outline",
      title: "Errand Assistance",
      color: "rgba(241, 243, 194, 0.4)",
      text: "Running essential errands on behalf of your loved ones to make their lives easier.",
    },
    {
      icon: "car-outline",
      title: "Destination Drive",
      color: "rgba(232, 180, 184, 0.4)",
      text: "Safe and reliable transportation for your loved ones to appointments and events.",
    },
  ];
  return (
    <View>
      <Text style={styles.sectionTitle}>Membership Benefits</Text>
      <View style={styles.benefitsContainer}>
        {membershipBenefits.map((benefit) => (
          <ImageBackground
            key={benefit.title}
            source={require("../../assets/imgs/flowerBackground.png")}
            style={styles.benefitCardBackground}
          >
            <View
              style={[styles.benefitCard, { backgroundColor: benefit.color }]}
            >
              <View style={styles.benefitHeader}>
                <Ionicons
                  name={benefit.icon}
                  size={14}
                  color={Color.appDefaultColor}
                />
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
              </View>
              <Text style={styles.benefitText}>{benefit.text}</Text>
            </View>
          </ImageBackground>
        ))}
      </View>
    </View>
  );
};

export default MemberShipBenefits;

const styles = StyleSheet.create({
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
  benefitsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    rowGap: 10,
  },
  benefitCardBackground: {
    width: width / 2.3,
  },
  benefitCard: {
    borderRadius: 20,
    padding: 15,
    height: height * 0.24,
  },
  benefitHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  benefitTitle: {
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 5,
  },
  benefitText: {
    fontSize: 14,
    fontWeight: "400",
    color: "black",
  },
});
