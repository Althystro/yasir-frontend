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
  Animated,
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
import SimpleAnimatedHeader from "../components/SimpleAnimatedHeader";

export default function ProfileScreen() {
  const [user, setUser] = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const queryClient = useQueryClient();
  const scrollY = new Animated.Value(0);

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
    const formatCurrency = (amount) => {
      if (typeof amount !== "number") return "0.00";
      return amount.toFixed(2);
    };

    return (
      <View key={plan.paymentPlanId} style={styles.paymentPlanContainer}>
        <View style={styles.planHeader}>
          <MaterialIcons name="directions-car" size={24} color="#1B2128" />
          <Text style={styles.planHeaderText}>{plan.vehicleModel}</Text>
        </View>

        <View style={styles.planDivider} />

        <View style={styles.planDetailsContainer}>
          <View style={styles.planDetailRow}>
            <View style={styles.planDetailItem}>
              <Text style={styles.planDetailLabel}>Customer</Text>
              <Text style={styles.planDetailValue}>
                {profile.firstName} {profile.lastName}
              </Text>
            </View>
            <View style={styles.planDetailItem}>
              <Text style={styles.planDetailLabel}>Financer</Text>
              <Text style={styles.planDetailValue}>{plan.financerName}</Text>
            </View>
          </View>

          <View style={styles.planDetailRow}>
            <View style={styles.planDetailItem}>
              <Text style={styles.planDetailLabel}>Monthly Payment</Text>
              <Text style={styles.planDetailValue}>
                KD {formatCurrency(plan.installmentAmount)}
              </Text>
            </View>
            <View style={styles.planDetailItem}>
              <Text style={styles.planDetailLabel}>Total Amount</Text>
              <Text style={styles.planDetailValue}>
                KD {formatCurrency(plan.totalAmount)}
              </Text>
            </View>
          </View>

          <View style={styles.planDetailRow}>
            <View style={styles.planDetailItem}>
              <Text style={styles.planDetailLabel}>Duration</Text>
              <Text style={styles.planDetailValue}>
                {plan.lengthMonths} Months
              </Text>
            </View>
            <View style={styles.planDetailItem}>
              <Text style={styles.planDetailLabel}>Status</Text>
              <Text style={[styles.planDetailValue, styles.statusText]}>
                {plan.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SimpleAnimatedHeader
        scrollY={scrollY}
        title={`Welcome back ${profile.firstName}`}
        backgroundColor="#1B2128"
      >
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={[styles.actionButton, styles.editButton]}
              >
                <Feather name="edit" size={24} color="#1B2128" />
                <Text style={styles.actionButtonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                style={[styles.actionButton, styles.logoutButton]}
              >
                <Feather name="log-out" size={24} color="#DC3545" />
                <Text style={[styles.actionButtonText, { color: "#DC3545" }]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoSection}>
            {renderProfileInfo("mail", "Email", profile.email)}
            {renderProfileInfo("card", "Civil ID", profile.civilId)}
            {renderProfileInfo("location", "Address", profile.address)}
            {renderProfileInfo("call", "Phone", profile.phoneNumber)}
            {paymentPlansData &&
              paymentPlansData.map((plan) => renderPaymentPlan(plan))}
          </View>
        </View>
      </SimpleAnimatedHeader>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2128",
    marginTop: 40,
  },
  content: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  planHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1B2128",
    marginLeft: 10,
  },
  planDivider: {
    height: 1,
    backgroundColor: "#e1e1e1",
    marginHorizontal: 16,
  },
  planDetailsContainer: {
    padding: 16,
  },
  planDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  planDetailItem: {
    flex: 1,
    marginHorizontal: 8,
  },
  planDetailLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  planDetailValue: {
    fontSize: 16,
    color: "#1B2128",
    fontWeight: "500",
  },
  statusText: {
    color: "#28a745",
    fontWeight: "600",
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
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 130,
    justifyContent: "center",
  },
  editButton: {
    borderColor: "#1B2128",
    backgroundColor: "#ffffff",
  },
  logoutButton: {
    borderColor: "#DC3545",
    backgroundColor: "#ffffff",
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#1B2128",
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
