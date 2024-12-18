import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AllVehiclesList from "../../components/AllVehiclesList";
import VehicleDetails from "../../screens/VehicleDetails";
import Purchases from "../../screens/Purchases";
import { Ionicons } from "@expo/vector-icons";
import Profile from "../../screens/Profile"; // Import the Profile screen

const Stack = createStackNavigator();

const VehicleNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="AllVehiclesList"
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
        name="AllVehiclesList"
        component={AllVehiclesList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VehicleDetails"
        component={VehicleDetails}
        options={{ title: "Vehicle Details" }}
      />
      <Stack.Screen
        name="Purchases"
        component={Purchases}
        options={{ title: "Purchases" }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerLeft: () => null, // Remove the back button on the Profile screen
        }}
      />
    </Stack.Navigator>
  );
};

export default VehicleNav;
