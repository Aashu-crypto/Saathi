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
import { useDispatch } from "react-redux";
import { screen } from "../../Redux/Slice/screenNameSlice";
import { Route } from "../../routes";
const Account = ({ navigation }) => {
  const profileOptionsData = [
    { title: "Contact Us" },
    { title: "About us" },
    { title: "How we do things" },
    { title: "My Services" },
  ];
  const [mail, setMail] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      const mail = await AsyncStorage.getItem("Email");
      console.log("My Mail", mail);
      setMail(mail);
    };
    fetch();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <HeaderComponent title={"Profile"} />
      <ScrollView style={{ marginHorizontal: 10 }}>
        {/* Commented out section; not relevant to map function focus */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <User />
          {mail?.length ? (
            <Text>{mail}</Text>
          ) : (
            <Pressable
              style={{
                backgroundColor: Color.lightpurple,
                borderRadius: 15,
                borderColor: Color.appDefaultColor,
                color: Color.colorDarkslategray,
                borderWidth: 1,
                padding: 15,
              }}
              onPress={() => {
                dispatch(screen(Route.LOGIN));
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  width: width / 1.8,
                  textAlign: "center",
                  fontFamily: FontFamily.poppinsRegular,
                  textDecorationLine: "underline",
                }}
              >
                Sign In/Sign Up
              </Text>
            </Pressable>
          )}
        </View>
        <Text style={styles.setting}>Settings</Text>
        {profileOptionsData.map((item, index) => (
          <View key={item.title}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Route.ABOUTUS);
              }}
            >
              <View style={styles.titleView}>
                <Text style={styles.titleText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ borderWidth: 0.5 }} />
          </View>
        ))}
        <Pressable onPress={() => AsyncStorage.clear()}>
          <Text style={[styles.titleText,{padding:5}]}>Logout</Text>
        </Pressable>

        {/* <Pressable
          onPress={() => {
            AsyncStorage.removeItem("number");
          }}
        >
          <Text>Logout</Text>
        </Pressable> */}
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
    // lineHeight:17,
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
  feedHeader: {
    height: 90,
    width: width,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  read: {
    color: Color.colorDarkslategray,
    fontWeight: "700",
    fontSize: 25,
  },
});
