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
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { Color, FontFamily } from "../../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Route } from "../../routes";
const { width, height } = Dimensions.get("window");
import { useDispatch } from "react-redux";
import { screen } from "../../Redux/Slice/screenNameSlice";
export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleContinue = async () => {
    if (phoneNumber.length === 10 && /^[0-9]+$/.test(phoneNumber)) {
      await AsyncStorage.setItem("number", phoneNumber);
    } else {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid 10-digit phone number."
      );
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
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.form}>
            <TextInput
              autoCapitalize="none"
              style={[styles.input, { borderBottomWidth: 1 }]}
              placeholder="Email"
              keyboardType="email-address" // Or 'phone-pad' if appropriate
              onChangeText={setEmail}
              value={email}
              placeholderTextColor={Color.colorDarkslategray}
            />
            {loginError && <Text style={styles.errorText}>{loginError}</Text>}

            <KeyboardAvoidingView style={[styles.passwordContainer]}>
              <TextInput
                style={[styles.input, { width: 180 }]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
                value={password}
                placeholderTextColor={Color.colorDarkslategray}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Ionicons
                  name={!showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </KeyboardAvoidingView>

            {!isLoaded ? (
              <>
                <TouchableOpacity
                  style={styles.login}
                  onPress={() => {
                    AsyncStorage.setItem("Email", email);
                    dispatch(screen(Route.MAIN));
                  }}
                >
                  <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                <Pressable
                  onPress={() => {
                    navigation.navigate(Route.SIGNUP);
                  }}
                >
                  <Text
                    style={[
                      styles.termsLink,
                      { textAlign: "center", marginTop: 15 },
                    ]}
                  >
                    Create Account
                  </Text>
                </Pressable>
              </>
            ) : (
              <ContentLoader />
            )}
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
    height: height * 0.3,
  },
  title: {
    fontSize: 16,
    alignSelf: "center",
    textAlign: "center",
    width: "70%",
    marginTop: 10,
  },
  headerText: {
    fontSize: 32,
    maxWidth: "80%",
    color: Color.appDefaultColor,
    textAlign: "center",
    fontFamily: FontFamily.poppinsRegular,
    fontWeight: "600",
    lineHeight: 30,
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
