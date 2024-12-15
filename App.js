import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { getToken } from "./api/storage";
import UserContext from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import AuthNav from "./navigation/AuthNavigation/AuthNav";
import MainNav from "./navigation/MainNav";
import Home from "./screens/Home";
import VehicleDetails from "./screens/VehicleDetails";
import ProfileScreen from "./screens/Profile";
import checkBaseURL from "./api/CheckBaseURL";
import instance from "./api";
import AllVehiclesList from "./components/AllVehiclesList";

export default function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState(false);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setUser(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={[user, setUser]}>
          {user ? <MainNav /> : <AuthNav />}

          {/* <Home /> */}
          {/* <VehicleDetails /> */}
          {/* <AuthNav /> */}
          {/* <ProfileScreen /> */}
          {/* <AllVehiclesList /> */}
        </UserContext.Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
