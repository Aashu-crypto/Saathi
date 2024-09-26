import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../GlobalStyles";
import { Route } from "../../routes"; // Assuming you have defined Route constants in your app
import { BACKEND_HOST } from "../../config"; // Define your backend host
import { useDispatch } from "react-redux";
import { screen } from "../../Redux/Slice/screenNameSlice";
export default function PasswordScreen({ route }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const email = route.params?.email; // Extract email from route params

  const handleSubmit = async () => {
    // Validation logic
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Both fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Set the loader to true
    setLoader(true);

    // Prepare the payload for the API request
    const payload = {
      password: password,
    };
    console.log(payload);

    try {
      // Make the POST request to the API
      const response = await fetch(
        `${BACKEND_HOST}/subscribers/complete?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Handle successful response
        setLoader(false);
        Alert.alert("Success", "Password set successfully!");
        dispatch(screen(Route.MAIN)); // Navigate to the main screen after success
      } else {
        // Handle API error
        setLoader(false);
        Alert.alert(
          "Error",
          result.message || "Failed to set password. Please try again."
        );
      }
    } catch (error) {
      // Handle any other errors (e.g., network issues)
      setLoader(false);
      Alert.alert(
        "Error",
        "An error occurred. Please check your connection and try again."
      );
      console.error("Error in password submission: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Create Your Password </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholderTextColor="#aaa"
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            {loader ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Color.appDefaultColor,
    marginBottom: 30,
    textAlign: "center",
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
    width: "95%",
  },
  submitButton: {
    backgroundColor: Color.appDefaultColor,
    height: 50,
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  submitButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
