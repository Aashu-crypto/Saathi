import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
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

const Account = ({ navigation }) => {
  const profileOptionsData = [
    { title: "About us", route: Route.ABOUTUS, content: "More about us here." },
    { title: "Your Saathi", route: Route.YOURSAATHI, content: "Details about Your Saathi." },
    { title: "Your Packages", route: Route.YOURPACKAGES, content: "Packages you have chosen." },
  ];

  const [mail, setMail] = useState();
  const [openAccordions, setOpenAccordions] = useState(
    new Array(profileOptionsData.length).fill(false)
  ); // To keep track of which accordion is open

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

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ marginHorizontal: 10, flex: 1, marginTop: 20 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
            marginVertical: 15,
          }}
        >
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
        <Text style={styles.setting}>Settings</Text>
        {profileOptionsData.map((item, index) => (
          <View key={item.title}>
            <TouchableOpacity
              onPress={() => toggleAccordion(index)} // Toggle the accordion when clicked
            >
              <View style={styles.titleView}>
                <Text style={styles.titleText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
            {openAccordions[index] && (
              <View style={styles.accordionContent}>
                <Text>{item.content}</Text>
              </View>
            )}
            <View style={{ borderWidth: 0.5 }} />
          </View>
        ))}
        {Object.keys(profile).length !== 0 && (
          <Pressable
            onPress={() => {
              dispatch(profileData([]));
            }}
            style={styles.logout}
          >
            <Text style={[styles.titleText, styles.logoutText]}>Logout</Text>
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
  setting: {
    fontSize: 25,
    color: Color.colorDarkslategray,
    fontWeight: "600",
    margin: 10,
  },
  titleView: {
    height: 57,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  titleText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray,
  },
  accordionContent: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 10,
    borderRadius: 5,
  },
  logout: {
    backgroundColor: Color.appDefaultColor,
    width: width * 0.8,
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 50,
  },
  logoutText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 2,
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
    color: Color.colorDarkslategray,
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
  },
});
