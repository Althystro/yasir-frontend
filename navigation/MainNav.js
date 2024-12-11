import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { deleteToken } from "../api/storage";
import UserContext from "../context/UserContext";

const MainNav = () => {
  const [user, setUser] = useContext(UserContext);

  const handleLogout = () => {
    deleteToken();
    setUser(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text>MainNav</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
});
