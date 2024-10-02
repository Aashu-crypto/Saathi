import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { OtpInput } from "react-native-otp-entry"; // Updated OTP Input Library
import { useNavigation } from "@react-navigation/native"; // For Navigation
import { Color, FontFamily } from "../../GlobalStyles";
import OTP from "../../assets/imgs/OtpScreen.svg";
import { Route } from "../../routes";
import { BACKEND_HOST } from "../../config";

export default function OtpScreen({ route }) {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const email = route?.params?.email || "default_email@example.com";
  const navigation = useNavigation(); // Navigation hook

  // Function to handle OTP verification
  const handleVerifyOtp = async (otp) => {
    navigation.navigate(Route.CONFIRMPASSWORD, {
      email: email,
    });
    if (otp && otp.length === 6) {
      setLoader(true);
      setError(null); // Clear previous error

      try {
        const response = await fetch(
          `${BACKEND_HOST}/subscribers/verify?email=${email}&otp=${otp}`,
          { method: "POST" }
        );
        console.log("response", response);

        const result = await response.json();

        // Handling different response statuses
        if (response.ok && result === 1) {
          setLoader(false);
          navigation.navigate(Route.CONFIRMPASSWORD, {
            email: email,
          });
        } else {
          setLoader(false);
          setError("Invalid OTP. Please try again.");
          Alert.alert("Error", "The OTP you entered is incorrect.");
        }
      } catch (error) {
        setLoader(false);
        setError("Failed to verify OTP. Please try again later.");
        Alert.alert(
          "Network Error",
          "Something went wrong. Please check your internet connection and try again."
        );
        console.error("OTP verification error: ", error);
      }
    } else {
      Alert.alert("Invalid OTP", "Please enter a 6-digit OTP.");
    }
  };

  // Function to handle OTP resend
  const handleResendOtp = () => {
    setLoader(true);
    // Simulate OTP resend logic here (API call)
    setTimeout(() => {
      setLoader(false);
      Alert.alert("OTP Resent", "A new OTP has been sent to your email.");
    }, 2000); // Simulating network delay for OTP resend
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View style={styles.innerContainer}>
            {/* SVG Illustration */}
            <OTP height={200} width={200} />

            {/* Title */}
            <Text style={styles.title}>Verify Your Email</Text>
            <Text style={styles.subtitle}>
              We have sent a 6-digit OTP to {email}.
            </Text>

            {/* OTP Input */}
            <OtpInput
              length={6}
              theme={{
                containerStyle: styles.otpContainer,
                pinCodeContainerStyle: styles.otpInput,
                pinCodeTextStyle: styles.pinCodeText,
                focusStickStyle: styles.focusStick,
                focusedPinCodeContainerStyle: styles.activePinCodeContainer,
              }}
              onFilled={handleVerifyOtp}
              onChangeText={(text) => setError(null)}
            />

            {/* Error message */}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Loader */}
            {loader && (
              <ActivityIndicator size="large" color={Color.appDefaultColor} />
            )}

            {/* Resend OTP */}
            <Text style={styles.resendText}>Didn’t receive the OTP?</Text>
            <Text style={styles.resendButton} onPress={handleResendOtp}>
              Resend OTP
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: Color.appDefaultColor,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: FontFamily.poppinsRegular,
  },
  subtitle: {
    fontSize: 16,
    color: Color.colorGrayLight,
    textAlign: "center",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: Color.lightOrange,
    color: "#333",
    fontSize: 20,
    borderWidth: 1,
    borderColor: Color.appDefaultColor,
    textAlign: "center",
    margin: 2,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginVertical: 10,
    textAlign: "center",
  },
  resendText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  resendButton: {
    fontSize: 16,
    color: Color.appDefaultColor,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
