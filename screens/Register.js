import { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import UserContext from "../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";

export default function Register({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [civilId, setCivilId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);

  const userInfo = {
    firstName: firstName,
    lastName: lastName,
    civilId: civilId,
    phoneNumber: phoneNumber,
    email: email,
    password: password,
  };

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register(userInfo),
    onSuccess: () => {
      setUser(true);
      console.log(userInfo);
    },
    onError: () => {
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again"
      );
    },
  });

  const handleRegister = () => {
    mutate();
  };

  return (
    <View style={styles.container}>
      <View style={styles.midSection}>
        {/* Only for the logo moto */}
        <Text style={styles.midText}> Yessir | يسر </Text>
        <Text style={styles.welcomeText}>Join Yessir</Text>
      </View>

      {/* The inputs */}
      <View style={styles.registerContainer}>
        {/* Name Labels */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.firstText}>First Name: </Text>

          <Text style={styles.secText}>Second Name: </Text>
        </View>
        {/* Name inputs */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TextInput
            style={styles.firstNameInput}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.lastNameInput}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.inputText}>Civil ID: </Text>
        <TextInput
          style={styles.input}
          placeholder="Civil ID"
          value={civilId}
          onChangeText={setCivilId}
          autoCapitalize="none"
        />
        <Text style={styles.inputText}>Phone Number: </Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          autoCapitalize="none"
        />

        <Text style={styles.inputText}>E-mail: </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.inputText}>Password: </Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.linkText}>
            Don't have an account? {""}
            <Text style={styles.registerText}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    flex: 2.5,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 70,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  firstNameInput: {
    // width: "40%",
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  lastNameInput: {
    // width: "40%",
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#1B2128",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    color: "#1B2128",
    fontSize: 16,
  },
  registerText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "400",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  midSection: {
    flex: 0.8,
    backgroundColor: "#1B2128",
    // backgroundColor: "blue",
    // marginTop: 40,
    borderBottomRightRadius: 65,
    borderBottomLeftRadius: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  midText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 80,
  },
  welcomeText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
  },
  sectionContainer: {
    width: "100%",
    maxWidth: 400,
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  firstText: {
    color: "#1B2128",
    fontSize: 15,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginRight: 80,
    marginLeft: 8,
  },
  secText: {
    color: "#1B2128",
    fontSize: 15,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginBottom: 3,
    marginRight: 70,
    marginLeft: 20,
  },
  inputText: {
    color: "#1B2128",
    fontSize: 15,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginBottom: 3,
  },
});
