import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Color, FontFamily, width } from "../../GlobalStyles";
import HeaderComponent from "../../components/HeaderComponent";

const Account = () => {
  const profileOptionsData = [
    { title: "Tip of the Day" },
    { title: "About us" },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <HeaderComponent title={"Profile"} />
      <ScrollView style={{ marginHorizontal: 10 }}>
        {/* Commented out section; not relevant to map function focus */}

        {profileOptionsData.map((item, index) => (
          <View key={item.title}>
            <TouchableOpacity
              onPress={() => {
                handleProfile(item);
              }}
            >
              <View style={styles.titleView}>
                <Text style={styles.titleText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
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
    fontWeight: "500",
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
