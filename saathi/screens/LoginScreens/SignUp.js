import React, { useEffect, useState, useRef } from "react";
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
import { StatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { Route } from "../../routes";
import { screen } from "../../Redux/Slice/screenNameSlice";
import { profileData } from "../../Redux/Slice/ProfileDataSlice";
import SignUpSvg from "../../assets/imgs/signup.svg";
import PhoneInput from "react-native-phone-number-input"; // Import the library
import { Color } from "../../GlobalStyles";

const { width, height } = Dimensions.get("window");

export default function SignUp({ navigation }) {
  const phoneInput = useRef(null); // Ref for PhoneInput
  const [number, setNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState(""); // For formatted phone number
  const [otpSent, setOtpSent] = useState(false); // OTP sent state
  const [otp, setOtp] = useState(""); // OTP state
  const [otpVerified, setOtpVerified] = useState(false); // OTP verification state
  const [loader, setLoader] = useState(false); // loader for Sign Up
  const [countryCode, setCountryCode] = useState("91");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    navigation.navigate(Route.OTPSCREEN, {
      email: email,
    });

    if (!firstName || !lastName || !email) {
      Alert.alert(
        "Please fill all the fields and verify OTP before submitting"
      );
      return;
    }
    setLoader(true);

    const formData = {
      firstName,
      lastName,
      email,
      contactNo: number, // Use formatted number
      countryCode,
    };
    console.log(formData);

    try {
      const response = await fetch(
        `https://saathi.etheriumtech.com:444/Saathi/subscribers/register`,
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
        navigation.navigate(Route.OTPSCREEN, {
          email: email,
        });
        setLoader(false);
    
      } else {
        setLoader(false);
        Alert.alert("Error", json.message || "Please fill all the fields");
      }
    } catch (error) {
      setLoader(false);
      Alert.alert("Error", "An error occurred. Please fill all the forms");
    }
  };

  const handlePhoneNumberSubmit = () => {
    const checkValid = phoneInput.current?.isValidNumber(number); // Check if the phone number is valid

    if (!checkValid) {
      Alert.alert("Please enter a valid phone number");
      return;
    }

    // Simulate sending OTP here
    setOtpSent(true);
    Alert.alert("OTP sent!", "Please check your phone for the OTP.");
  };

  const handleVerifyOtp = () => {
    if (otp !== "1234") {
      // Replace with actual OTP verification logic
      Alert.alert("Invalid OTP", "Please enter the correct OTP.");
      return;
    }
    setOtpVerified(true);
    Alert.alert("OTP Verified!", "You can now submit the form.");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
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
                  style={styles.input}
                  placeholder="First Name"
                  onChangeText={setFirstName}
                  value={firstName}
                  placeholderTextColor="gray"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  onChangeText={setLastName}
                  value={lastName}
                  placeholderTextColor="gray"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  value={email}
                  placeholderTextColor="gray"
                />

                {/* Phone Number Input with Country Code */}
                <View style={styles.phoneInputContainer}>
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={number}
                    defaultCode="IN"
                    layout="first"
                    onChangeText={(text) => {
                      setNumber(text);
                    }}
                    onChangeFormattedText={(text) => {
                      setFormattedValue(text); // Get the formatted phone number with country code
                    }}
                    onChangeCountry={(country) => {
                      setCountryCode(country.callingCode[0]); // Set the country code
                    }}
                    withDarkTheme
                    withShadow
                    
                    containerStyle={styles.phoneInput}
                    textContainerStyle={styles.phoneInputText}
                  />
                </View>

                <TouchableOpacity
                  style={styles.login}
                  onPress={handleSubmit}
                  // Disable if OTP is not verified
                >
                  {loader ? (
                    <Text style={styles.loginText}>
                      Please wait... <ActivityIndicator />
                    </Text>
                  ) : (
                    <Text style={styles.loginText}>Next</Text>
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
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: height * 0.2,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    width: "80%",
    color: "#555",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  form: {
    width: "85%",
    marginBottom: 50,
  },
  formTitle: {
    alignSelf: "center",
    fontSize: 24,
    color: "#333",
    marginBottom: 25,
  },
  input: {
    height: 50,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Color.lightOrange,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Color.appDefaultColor,
    fontSize: 16,
    color: Color.colorGray,
  },
  phoneInputContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden", // Ensure the rounded corners are applied to the entire PhoneInput
  },
  phoneInput: {
    width: "100%",
    backgroundColor: Color.lightOrange,
    height: 60,
    borderRadius: 10,
    borderColor: Color.appDefaultColor,
    borderWidth: 1,
  },
  phoneInputText: {
    backgroundColor: Color.lightOrange,
    borderRadius: 10,
  },
  login: {
    backgroundColor: Color.appDefaultColor,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    marginBottom: 20,
  },
  loginText: {
    fontSize: 18,
    alignSelf: "center",
    color: "#fff",
    fontWeight: "500",
  },
  footerText: {
    color: "#333",
    fontSize: 14,
  },
});
