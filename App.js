import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import * as Notifications from "expo-notifications";
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
import AllVehiclesList from "./components/AllVehiclesCard";
import AllVehicles from "./screens/AllVehicles";
import Purchases from "./screens/Purchases";
import PdfGenerator from "./components/PdfGenerator";
import TestDriveContext from "./context/TestDriveContext";
import HomeNav from "./navigation/HomeNavigation/HomeNav";
import PaymentPlansScreen from "./screens/Admin";

export default function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState(false);
  const [TestDrive, setTestDrive] = useState({});

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
          <TestDriveContext.Provider value={[TestDrive, setTestDrive]}>
            {user ? <HomeNav /> : <AuthNav />}
            {/* <PaymentPlansScreen /> */}
            {/* <Home /> */}
            {/* <VehicleDetails /> */}
            {/* <AuthNav /> */}
            {/* <ProfileScreen /> */}
            {/* <AllVehicles /> */}

            {/* <Purchases/> */}
          </TestDriveContext.Provider>
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
