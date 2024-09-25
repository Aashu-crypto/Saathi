import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Platform,
  ActivityIndicator,
} from "react-native";

import { Color, FontFamily } from "../../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "../../routes";
import { screen } from "../../Redux/Slice/screenNameSlice";
import { profileData } from "../../Redux/Slice/ProfileDataSlice";
import SignUpSvg from "../../assets/imgs/signup.svg";
import DropDownPicker from "react-native-dropdown-picker";
import ContentLoader from "../../components/ContentLoader";

const { width, height } = Dimensions.get("window");

export default function SignUp({ navigation }) {
  const [number, setNumber] = useState();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState("");
  const data = useSelector((state) => state.subscriptionPackages.packagesData);

  useEffect(() => {
    if (data && data.length > 0) {
      const packageItems = data.map((item) => ({
        label: item.packageName,
        value: item.packageID,
      }));
      setItems(packageItems);
    }
  }, [data]);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Please fill all the fields before Submitting");
      return;
    }
    setLoader(true);

    const formData = {
      firstName,
      lastName,
      email,
      contactNo: number,
      password,
      // packageID: value,
    };
    console.log("formData", formData);

    try {
      const response = await fetch(
        `https://saathi.etheriumtech.com:444/Saathi/subscribers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const json = await response.json();
      if (response.ok) {
        dispatch(profileData(json));

        dispatch(screen(Route.MAIN));
        setLoader(false);
        Alert.alert(
          "Your request has been Submitted!",
          "We will get back to you shortly"
        );
      } else {
        setLoader(false);
        Alert.alert("Error", json.message || "Please Fill all the fields");
      }
    } catch (error) {
      setLoader(false);
      Alert.alert("Error", "An error occurred. Please Fill all the forms");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust the offset if needed
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.headerContainer}>
              <Text style={styles.title}>
                A companion for you and your loved ones
              </Text>
              <SignUpSvg height={100} width={100} />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.form}>
                <Text style={styles.formTitle}>Create Account</Text>
                <TextInput
                  style={[styles.input, { borderBottomWidth: 1 }]}
                  placeholder="Enter your first name"
                  onChangeText={setFirstName}
                  value={firstName}
                  placeholderTextColor={Color.colorDarkslategray}
                />
                <TextInput
                  style={[styles.input, { borderBottomWidth: 1 }]}
                  placeholder="Enter your last name"
                  onChangeText={setLastName}
                  value={lastName}
                  placeholderTextColor={Color.colorDarkslategray}
                />
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder="Select a Package"
                  zIndex={1000}
                  style={styles.dropdown}
                  textStyle={styles.inputText}
                  dropDownContainerStyle={styles.dropDownContainer}
                  listItemLabelStyle={styles.listItemLabel}
                />
                <TextInput
                  style={[styles.input, { borderBottomWidth: 1 }]}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  value={email}
                  placeholderTextColor={Color.colorDarkslategray}
                />
                <TextInput
                  style={[styles.input, { borderBottomWidth: 1 }]}
                  placeholder="Phone number"
                  keyboardType="phone-pad"
                  onChangeText={setNumber}
                  value={number}
                  placeholderTextColor={Color.colorDarkslategray}
                />
                <View style={[styles.passwordContainer]}>
                  <TextInput
                    style={[styles.input, { width: 180 }]}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                    value={password}
                    placeholderTextColor={Color.colorDarkslategray}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={!showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.login} onPress={handleSubmit}>
                  {loader ? (
                  <Text style={styles.loginText}>Please wait...   <ActivityIndicator/> </Text>
                  ) : (
                    <Text style={styles.loginText}>Sign Up</Text>
                  )}
                </TouchableOpacity>
                <Pressable
                  onPress={() => navigation.navigate(Route.LOGIN)}
                  style={{ marginTop: 15, alignItems: "center" }}
                >
                  <Text style={styles.footerText}>
                    Already Have an Account?
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // your existing styles
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerContainer: {
    width: "100%",
    paddingVertical: height * 0.1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: height * 0.2,
  },
  title: {
    fontSize: 13,
    textAlign: "center",
    width: "80%",
    color: Color.colorGray,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  form: {
    width: "80%",
    marginBottom: 50,
  },
  formTitle: {
    alignSelf: "center",
    fontSize: 20,
    color: Color.colorDarkslategray,
    marginBottom: 25,
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Color.lightpurple,
    marginBottom: 15,
    borderColor: Color.appDefaultColor,
  },
  dropdown: {
    height: 40,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Color.lightpurple,
    borderColor: Color.appDefaultColor,
    marginBottom: 15,
  },
  login: {
    backgroundColor: Color.appDefaultColor,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
  },
  loginText: {
    fontSize: 18,
    alignSelf: "center",
    color: "#fff",
    fontWeight: "500",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderRadius: 5,
    backgroundColor: Color.lightpurple,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: Color.appDefaultColor,
    marginVertical: 10,
  },
  footerText: {
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.poppinsRegular,
  },
});
