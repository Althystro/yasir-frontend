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
    // <View style={styles.container}>
    //   <Text style={styles.title}>Login</Text>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Email"
    //     value={email}
    //     onChangeText={setEmail}
    //     keyboardType="email-address"
    //     autoCapitalize="none"
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Password"
    //     value={password}
    //     onChangeText={setPassword}
    //     secureTextEntry
    //   />
    //   <TouchableOpacity style={styles.button} onPress={handleLogin}>
    //     <Text style={styles.buttonText}>Login</Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     style={styles.linkButton}
    //     onPress={() => navigation.navigate("Register")}
    //   >
    //     <Text style={styles.linkText}>Don't have an account? Register</Text>
    //   </TouchableOpacity>
    // </View>

    <View style={styles.container}>
      <View style={styles.topSection}>{/* Nothing added here? */}</View>
      <View style={styles.midSection}>
        {/* Only for the logo moto */}
        <Text style={styles.midText}> Yessir | يسر </Text>
        <Text style={{ color: "white", fontSize: 30 }}>Welcome Back!</Text>
      </View>

      {/* The inputs */}
      <View style={styles.bottomSection}>
        <View style={styles.loginContainer}>
          {/* <Text style={styles.title}>Login</Text> */}
          <TextInput
            style={styles.emailInput}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
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
            <Text style={styles.linkText}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    // flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
  },
  emailInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 80,
    // marginBottom: 20,
  },
  passwordInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 30,
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
