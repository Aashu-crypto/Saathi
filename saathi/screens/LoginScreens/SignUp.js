import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";

import { Color, FontFamily } from "../../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");
import { useDispatch } from "react-redux";
import { Route } from "../../routes";
import { screen } from "../../Redux/Slice/screenNameSlice";
import { profileData } from "../../Redux/Slice/ProfileDataSlice";
import SignUpSvg from "../../assets/imgs/signup.svg";
export default function SignUp({ navigation }) {
  const [number, setNumber] = useState();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const [loginError, setLoginError] = useState(null);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    // Collect the form data
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Please fill all the fields before Submitting");
      return;
    }
    const formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      contactNo: number,
      password: password,
      packageServiceID: 1,
    };

    try {
      // Send the POST request with JSON data
      const response = await fetch(
        `https://saathi.etheriumtech.com:444/Saathi/subscribers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the request headers
          },
          body: JSON.stringify(formData), // Convert the data to a JSON string
        }
      );

      // Handle the response
      const json = await response.json();
      console.log(json);
      dispatch(profileData(json));
      dispatch(screen(Route.MAIN));

      if (response.ok) {
        Alert.alert(
          "Your request has been Submitted !",
          "We will get back to you shortly"
        );
        // You can navigate to another screen or perform other actions
      } else {
        Alert.alert("Error", json.message || "Please Fill all the fields");
      }
    } catch (error) {
      console.error("Error occured", error);
      Alert.alert("Error", "An error occurred. Please Fill all the forms");
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View
          colors={[Color.appDefaultColor, Color.lightOrange]}
          style={styles.headerContainer}
        >
          <Text style={styles.headerText}>Saathi</Text>
          <Text style={styles.title}>
            A companion for you and your loved ones
          </Text>
          <SignUpSvg height={100} width={100} />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.form}>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 20,
                color: Color.colorDarkslategray,
                marginBottom: 25,
              }}
            >
              Create Account
            </Text>
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

            <TextInput
              style={[styles.input, { borderBottomWidth: 1 }]}
              placeholder="Email"
              keyboardType="email-address" // Or 'phone-pad' if appropriate
              onChangeText={setEmail}
              value={email}
              placeholderTextColor={Color.colorDarkslategray}
            />
            {/* {loginError.error.mail && (
            <Text style={styles.errorText}>{loginError.error.mail}</Text>
          )} */}
            <TextInput
              style={[styles.input, { borderBottomWidth: 1 }]}
              placeholder="Phone number"
              keyboardType="phone-pad" // Or 'phone-pad' if appropriate
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
              {loginError && (
                <Text style={styles.errorText}>
                  {loginError.error.password}
                </Text>
              )}
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Ionicons
                  name={!showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.login} onPress={handleSubmit}>
              <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
            <Pressable
              onPress={() => navigation.navigate(Route.LOGIN)}
              style={{ marginTop: 15, alignItems: "center" }}
            >
              <Text
                style={{
                  color: Color.colorDarkslategray,
                  fontFamily: FontFamily.poppinsRegular,
                }}
              >
                Already Have an Account?
              </Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          onPress={() => {
            dispatch(screen(Route.MAIN));
          }}
        >
          <Ionicons
            name={"close-circle-outline"}
            size={35}
            color={Color.appDefaultColor}
          />
          <Text style={{ fontSize: 6, alignSelf: "center" }}>close</Text>
        </Pressable>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerContainer: {
    width: "100%",
    paddingVertical: height * 0.1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: height * 0.25,
  },
  title: {
    fontSize: 13,
    alignSelf: "center",
    textAlign: "center",
    width: "80%",
    marginTop: 10,
    color: Color.colorGray,
  },
  headerText: {
    fontSize: 32,
    maxWidth: "80%",
    color: Color.appDefaultColor,
    textAlign: "center",
    fontFamily: FontFamily.dreamOrphan,
    fontWeight: "600",
    lineHeight: 35,
    letterSpacing: 2,
  },
  PhoneText: {
    color: "#4A4A4A",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    fontFamily: FontFamily.poppinsRegular,
    marginTop: 40,
    marginBottom: 15,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: Color.lightOrange,
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    fontWeight: "400",
    lineHeight: 21,
    fontFamily: FontFamily.poppinsRegular,
  },
  continueButton: {
    width: "70%",
    height: 50,
    backgroundColor: Color.appDefaultColor,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    fontFamily: FontFamily.poppinsRegular,
  },
  separatorText: {
    fontSize: 16,
    color: "#4A4A4A",
    marginTop: 25,
    marginBottom: 10,
  },
  socialButtonsContainer: {
    width: "100%",
    alignItems: "center",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  socialIconContainer: {
    backgroundColor: "#EDEAEA",
    borderRadius: 20,
    padding: 5,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  socialButtonTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "500",
    color: "#000000",
    alignSelf: "center",
    justifyContent: "center",
    lineHeight: 22.5,
    fontFamily: FontFamily.poppinsRegular,
  },
  appleButton: {
    backgroundColor: "#000000",
  },
  appleButtonText: {
    color: "#ffffff",
  },
  form: {
    width: "80%",
    marginBottom: 50,
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Color.lightpurple,
    marginBottom: 15,
    borderColor: Color.appDefaultColor,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",

    height: 40,

    borderRadius: 5,
    backgroundColor: Color.lightpurple,
    marginBottom: 10,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: Color.appDefaultColor,
    marginVertical: 10,
  },
  accountInfo: {
    alignItems: "center",
  },
  accountInfoText: {
    marginBottom: 5,
  },
  accountInfoLink: {
    color: "#4CAF50",
    textDecorationLine: "underline",
  },
  termsText: {
    fontSize: 14,
    color: "#000",
  },
  termsLink: {
    color: Color.appDefaultColor,
    textDecorationLine: "underline",
  },
  login: {
    backgroundColor: Color.appDefaultColor,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
  },
  loginText: {
    fontSize: 18,
    lineHeight: 24,
    alignSelf: "center",
    color: "#fff",
    fontWeight: "500",
  },
});
