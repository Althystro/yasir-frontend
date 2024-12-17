import { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import UserContext from "../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);

  const userInfo = {
    email: email,
    password: password,
  };

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(userInfo),
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

  const handleLogin = () => {
    mutate();
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.topSection}></View> */}
      <View style={styles.midSection}>
        {/* Only for the logo moto */}
        <Text style={styles.midText}> Yessir | يسر </Text>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
      </View>

      {/* The inputs */}
      <View style={styles.loginContainer}>
        <Text style={styles.firstText}>E-mail:</Text>
        <TextInput
          style={styles.emailInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.secText}>Password:</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.linkText}>
            Don't have an account? {""}
            <Text style={styles.registerText}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 2.5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 210,
  },
  emailInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  passwordInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  button: {
    width: "100%",
    backgroundColor: "#1B2128",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
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
    // flexDirection: "column",
    // backgroundColor: "transparent",
  },
  midSection: {
    flex: 1,
    backgroundColor: "#1B2128",
    // backgroundColor: "blue",
    // marginTop: -10,
    borderBottomRightRadius: 65,
    borderBottomLeftRadius: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  midText: {
    marginTop: 80,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  welcomeText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
  },
  firstText: {
    color: "#1B2128",
    fontSize: 15,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginBottom: -6,
  },
  secText: {
    color: "#1B2128",
    fontSize: 15,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
});
