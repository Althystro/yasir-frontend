import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../screens/Home";
import AllVehiclesList from "../../components/AllVehiclesList";
import TestDrive from "../../components/TestDrive";
import AIRecomendation from "../../components/AIRecomendation";
import VehicleDetails from "../../screens/VehicleDetails";
import PdfGenerator from "../../components/PdfGenerator";
import { Ionicons } from "@expo/vector-icons";
import Purchases from "../../screens/Purchases";
import ProfileScreen from "../../screens/Profile";
import VehicleNav from "../VehicleNav/VehicleNav";

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTransparent: true,
          headerTintColor: "transparent",
          headerTitle: "",
          headerTitleStyle: {
            fontWeight: "600",
          },
          headerBackImage: () => (
            <Ionicons
              name="chevron-back"
              size={28}
              color="white"
              style={{ marginLeft: 10 }}
            />
          ),
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={
            {
              // headerShown: false,
            }
          }
        />
        <Stack.Screen name="All Vehicles" component={VehicleNav} />
        <Stack.Screen name="Test Drive" component={TestDrive} />
        <Stack.Screen name="Ai Recommendations" component={AIRecomendation} />
        <Stack.Screen name="Vehicle Details" component={VehicleDetails} />
        <Stack.Screen name="Pdf Generator" component={PdfGenerator} />
        <Stack.Screen name="Purchases" component={Purchases} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </>
  );
};

export default HomeNav;

const styles = StyleSheet.create({});
