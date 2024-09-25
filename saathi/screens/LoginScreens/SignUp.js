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

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !password || !otpVerified) {
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
      contactNo: formattedValue, // Use formatted number
      password,
    };

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
                  style={[styles.input, { borderBottomWidth: 1 }]}
                  placeholder="First Name"
                  onChangeText={setFirstName}
                  value={firstName}
                  placeholderTextColor="gray"
                />
                <TextInput
                  style={[styles.input, { borderBottomWidth: 1 }]}
                  placeholder="Last Name"
                  onChangeText={setLastName}
                  value={lastName}
                  placeholderTextColor="gray"
                />
                <TextInput
                  style={[styles.input, { borderBottomWidth: 1 }]}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  value={email}
                  placeholderTextColor="gray"
                />

                {/* Phone Number Input with Country Code */}
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={number}
                  defaultCode="US"
                  layout="first"
                  onChangeText={(text) => {
                    setNumber(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setFormattedValue(text); // Get the formatted phone number with country code
                  }}
                  withDarkTheme
                  withShadow
                  autoFocus
                />

                {formattedValue && !otpSent && (
                  <TouchableOpacity
                    style={styles.login}
                    onPress={handlePhoneNumberSubmit}
                  >
                    <Text style={styles.loginText}>Send OTP</Text>
                  </TouchableOpacity>
                )}

                {otpSent && (
                  <View>
                    <TextInput
                      style={[styles.input, { borderBottomWidth: 1 }]}
                      placeholder="Enter OTP"
                      keyboardType="number-pad"
                      onChangeText={setOtp}
                      value={otp}
                      placeholderTextColor="gray"
                      maxLength={4} // Assuming a 4-digit OTP
                    />
                    <TouchableOpacity
                      style={styles.verifyOtpButton} // Updated Button Style
                      onPress={handleVerifyOtp}
                    >
                      <Text style={styles.verifyOtpText}>Verify OTP</Text>
                    </TouchableOpacity>
                  </View>
                )}

                <View style={[styles.passwordContainer]}>
                  <TextInput
                    style={[styles.input, { width: 180 }]}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                    value={password}
                    placeholderTextColor="gray"
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
                <TouchableOpacity
                  style={styles.login}
                  onPress={handleSubmit}
                  disabled={!otpVerified} // Disable if OTP is not verified
                >
                  {loader ? (
                    <Text style={styles.loginText}>
                      Please wait... <ActivityIndicator />
                    </Text>
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
    color: "#555",
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
    fontSize: 25,
    color: "#333",
    marginBottom: 25,
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    marginBottom: 15,
    borderColor: "#999",
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
    backgroundColor: "#f0f0f0",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#999",
    marginVertical: 10,
  },
  footerText: {
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  verifyOtpButton: {
    backgroundColor: "#007bff", // Blue color for better visibility
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#000", // Shadow for the button
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  verifyOtpText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});
