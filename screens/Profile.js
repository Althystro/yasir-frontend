import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyProfile, updateProfile } from "../api/auth";
import { Ionicons } from "@expo/vector-icons";
import { deleteToken } from "../api/storage";
import UserContext from "../context/UserContext";
import Feather from "@expo/vector-icons/Feather";
import { getPaymentPlanByUserId } from "../api/paymentPlan";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function ProfileScreen() {
  const [user, setUser] = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getMyProfile,
  });

  useEffect(() => {
    if (profile) {
      setAddress(profile.address);
      setPhoneNumber(profile.phoneNumber);
    }
  }, [profile]);

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (userInfo) => await updateProfile(userInfo),
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries("user");
        await queryClient.refetchQueries("user");
        setModalVisible(false);
      } catch (error) {
        console.error("Error during query invalidation:", error);
      }
    },
    onError: () => {
      Alert.alert(
        "Update Failed",
        "There was an error updating your profile. Please try again."
      );
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setAddress(profile?.address || "");
      setPhoneNumber(profile?.phoneNumber || "");
    }
  }, [isSuccess, profile]);

  const {
    data: paymentPlansData,
    isLoading: isPaymentPlansLoading,
    error: paymentPlansError,
  } = useQuery({
    queryKey: ["PaymentPlan", profile?.id],
    queryFn: () => getPaymentPlanByUserId(profile.id),
    enabled: !!profile, // Only run the query if profile is available
  });

  if (isPaymentPlansLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (paymentPlansError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{error.message}</Text>
        <Text>Error loading profile</Text>
      </SafeAreaView>
    );
  }

  // console.log(paymentPlansData);

  const handleUpdateProfile = () => {
    mutate({ address, phoneNumber });
  };

  const handleLogout = () => {
    deleteToken();
    setUser(false);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{error.message}</Text>
        <Text>Error loading profile</Text>
      </SafeAreaView>
    );
  }

  const renderProfileInfo = (icon, label, value) => (
    <View style={styles.infoCard}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color="#1B2128" />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  const renderPaymentPlan = (plan) => {
    return (
      <View key={plan.paymentPlanId} style={styles.paymentPlanContainer}>
        <View style={styles.planRow}>
          <Icon name="person" size={16} />
          <Text style={styles.planTitle}> Customer Name: </Text>
          <Text style={styles.planText}>
            {profile.firstName} {profile.lastName}
          </Text>
        </View>
        <View style={styles.planRow}>
          <Icon name="account-balance" size={16} />
          <Text style={styles.planTitle}> Financer Name: </Text>
          <Text style={styles.planText}>{plan.financerName}</Text>
        </View>
        <View style={styles.planRow}>
          <Icon name="attach-money" size={16} />
          <Text style={styles.planTitle}> Installment Amount: </Text>
          <Text style={styles.planText}>
            {plan.installmentAmount.toFixed(2)}
          </Text>
        </View>
        <View style={styles.planRow}>
          <Icon name="calendar-today" size={16} />
          <Text style={styles.planTitle}> Length (Months): </Text>
          <Text style={styles.planText}>{plan.lengthMonths}</Text>
        </View>
        <View style={styles.planRow}>
          <Icon name="info" size={16} />
          <Text style={styles.planTitle}> Status: </Text>
          <Text style={styles.planText}>{plan.status}</Text>
        </View>
        <View style={styles.planRow}>
          <Icon name="attach-money" size={16} />
          <Text style={styles.planTitle}> Total Amount: </Text>
          <Text style={styles.planText}>{plan.totalAmount}</Text>
        </View>
        <View style={styles.planRow}>
          <Icon name="directions-car" size={16} />
          <Text style={styles.planTitle}> Vehicle Model: </Text>
          <Text style={styles.planText}>{plan.vehicleModel}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.headerButton}
        >
          <Feather name="edit" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.headerTitle}>
            Welcome back {profile.firstName}
          </Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
          <Feather name="log-out" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri:
                profile.image ||
                "https://png.pngtree.com/png-clipart/20220719/original/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_8385663.png",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>
            {profile.firstName + " " + profile.lastName}
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.infoSection}>
            {renderProfileInfo("mail", "Email", profile.email)}
            {renderProfileInfo("card", "Civil ID", profile.civilId)}
            {renderProfileInfo("location", "Address", profile.address)}
            {renderProfileInfo("call", "Phone", profile.phoneNumber)}
            {paymentPlansData &&
              paymentPlansData.map((plan) => renderPaymentPlan(plan))}
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Profile</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter Address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter Phone Number"
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleUpdateProfile}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2128",
    marginTop: -40,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#1B2128",
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
    marginHorizontal: "15%",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
  },
  content: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B2128",
    marginTop: 15,
  },
  infoSection: {
    marginTop: 20,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  paymentPlanContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.62,
    elevation: 4,
  },
  planRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B2128",
  },
  planText: {
    fontSize: 16,
    color: "#1B2128",
    marginLeft: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
    justifyContent: "center",
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: "#1B2128",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  updateButton: {
    backgroundColor: "#1B2128",
  },
  logoutButton: {
    backgroundColor: "#DC3545",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    width: "90%",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1B2128",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f8f9fa",
  },
  submitButton: {
    backgroundColor: "#1B2128",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});
