import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AiRecomendation from "../components/AIRecomendation";
import AllVehiclesList from "../components/AllVehiclesList";
import { Ionicons } from "@expo/vector-icons";
import TestDrive from "../components/TestDrive";
import PdfGenerator from "../components/PdfGenerator";
import HomeNav from "./HomeNavigation/HomeNav";
import ProfileScreen from "../screens/Profile";
import VehicleNav from "./VehicleNav/VehicleNav";

const Tab = createBottomTabNavigator();

const MainNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "All Vehicles") {
            iconName = focused ? "car" : "car-outline";
          } else if (route.name === "Test Drive") {
            iconName = focused ? "car" : "car-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeNav} />
      <Tab.Screen name="All Vehicles" component={VehicleNav} />
      <Tab.Screen name="Test Drive" component={TestDrive} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNav;

const styles = StyleSheet.create({});
