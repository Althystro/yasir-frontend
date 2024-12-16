import React, { useState, useEffect } from "react";
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
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyProfile, updateProfile } from "../api/auth";

export default function ProfileScreen() {
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

  const handleUpdateProfile = () => {
    mutate({ address, phoneNumber });
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome Back, {profile.name}</Text>
      </View>

      <View style={styles.content}>
        <Image
          source={{
            uri:
              profile.image ||
              "https://png.pngtree.com/png-clipart/20220719/original/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_8385663.png",
          }}
          style={styles.profileImage}
        />

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>
            {profile.firstName + " " + profile.lastName}
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profile.email}</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Civil ID:</Text>
          <Text style={styles.value}>{profile.civilId}</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{profile.address}</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>{profile.phoneNumber}</Text>
        </View>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
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
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: "#1a1a1a",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 65,
    borderBottomLeftRadius: 65,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  label: {
    width: 100,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: "#666",
  },
  updateButton: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    borderRadius: 15,
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#1a1a1a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    padding: 15,
    borderRadius: 8,
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
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});
