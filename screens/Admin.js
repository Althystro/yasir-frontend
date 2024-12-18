import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { getAllPaymentPlans, updatePaymentPlan } from "../api/paymentPlan";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const PaymentPlansScreen = () => {
  const [paymentPlans, setPaymentPlans] = useState([]);
  //const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["paymentPlans"],
    queryFn: getAllPaymentPlans,
    enabled: !paymentPlans.length,
    onSuccess: (data) => {
      setPaymentPlans(data);
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["updatePaymentPlan"],
    mutationFn: ({ id, status }) =>
      updatePaymentPlan({ id, firstStatus: status }),
    onSuccess: () => {
      queryClient.invalidateQueries("paymentPlans");
    },
  });

  const handleUpdatePaymentPlan = (id, status) => {
    console.log(id, status);
    mutate({ id, status });
  };

  const renderPaymentPlan = ({ item }) => (
    <View style={styles.paymentPlanCard}>
      <Text style={styles.planTitle}>Plan ID: {item.paymentPlanId}</Text>
      <Text style={styles.planText}>Customer: {item.customerName}</Text>
      <Text style={styles.planText}>Financer: {item.financerName}</Text>
      <Text style={styles.planText}>
        Installment Amount: {item.installmentAmount}
      </Text>
      <Text style={styles.planText}>Length in Months: {item.lengthMonths}</Text>
      <Text style={styles.planText}>Amount: {item.totalAmount}</Text>
      <Text style={styles.planText}>Vehicle: {item.vehicleModel}</Text>
      <Text style={styles.planText}>Status: {item.status}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.approveButton]}
          onPress={() =>
            handleUpdatePaymentPlan(item.paymentPlanId, "APPROVED")
          }
        >
          <Text style={styles.actionButtonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton]}
          onPress={() =>
            handleUpdatePaymentPlan(item.paymentPlanId, "REJECTED")
          }
        >
          <Text style={styles.actionButtonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1B2128" />
        <Text style={styles.loadingText}>Loading payment plans...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Error loading payment plans</Text>
      </SafeAreaView>
    );
  }

  //   console.log(data);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderPaymentPlan}
        keyExtractor={(item, index) => (item.id ? item.id : index)}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

export default PaymentPlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2128",
  },
  contentContainer: {
    padding: 20,
  },
  paymentPlanCard: {
    backgroundColor: "#f8f9fa",
    padding: 20,
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
  planTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B2128",
    marginBottom: 10,
  },
  planText: {
    fontSize: 16,
    color: "#1B2128",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  approveButton: {
    backgroundColor: "#28a745",
  },
  rejectButton: {
    backgroundColor: "#dc3545",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
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
