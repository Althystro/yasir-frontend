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
        "Registration Failed",
        "Please check your credentials and try again"
      );
    },
  });

  const handleRegister = () => {
    mutate();
  };

  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Register</Text>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="First Name"
    //     value={firstName}
    //     onChangeText={setFirstName}
    //     autoCapitalize="none"
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Last Name"
    //     value={lastName}
    //     onChangeText={setLastName}
    //     autoCapitalize="none"
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Civil ID"
    //     value={civilId}
    //     onChangeText={setCivilId}
    //     autoCapitalize="none"
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Phone Number"
    //     value={phoneNumber}
    //     onChangeText={setPhoneNumber}
    //     autoCapitalize="none"
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Email"
    //     value={email}
    //     onChangeText={setEmail}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Password"
    //     value={password}
    //     onChangeText={setPassword}
    //     secureTextEntry
    //   />

    //   <TouchableOpacity style={styles.button} onPress={handleRegister}>
    //     <Text style={styles.buttonText}>Register</Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     style={styles.linkButton}
    //     onPress={() => navigation.navigate("Login")}
    //   >
    //     <Text style={styles.linkText}>Already have an account? Login</Text>
    //   </TouchableOpacity>
    // </View>

    <View style={styles.container}>
      <View style={styles.topSection}>{/* Nothing added here? */}</View>
      <View style={styles.midSection}>
        {/* Only for the logo moto */}
        <Text style={styles.midText}> Yessir | يسر </Text>
        <Text style={{ color: "white", fontSize: 30 }}>Join Yessir</Text>
      </View>

      {/* The inputs */}
      <View style={styles.bottomSection}>
        <View style={styles.registerContainer}>
          <Text style={styles.title}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Civil ID"
            value={civilId}
            onChangeText={setCivilId}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
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
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    // flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
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
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  topSection: {
    flex: 0.7,
    backgroundColor: "#ffffff",
    // backgroundColor: "red",
  },
  midSection: {
    flex: 1,
    backgroundColor: "#1B2128",
    // backgroundColor: "blue",
    marginTop: -40,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    flex: 3.5,
    backgroundColor: "#ffffff",
    // backgroundColor: "yellow",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -30,
    // justifyContent: "center",
    // alignItems: "center",
    alignContent: "flex-start",
  },
  midText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  sectionContainer: {
    width: "100%",
    maxWidth: 400,
    paddingHorizontal: 20,
    marginVertical: 15,
  },
});
