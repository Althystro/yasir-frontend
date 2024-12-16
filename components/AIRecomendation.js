import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import openAi from "../api/openAi";
import Icon from "react-native-vector-icons/FontAwesome";
import RecomendationCard from "./RecomendationCard";

const questions = [
  {
    id: 1,
    question: "What is your current salary?",
    placeholder: "Enter your current salary",
    key: "salary",
  },
  {
    id: 2,
    question: "What are your financial obligations?",
    placeholder: "Enter your monthly financial obligations",
    key: "obligations",
  },
  {
    id: 3,
    question: "What is your down payment amount?",
    placeholder: "Enter down payment amount",
    key: "downPayment",
  },
  {
    id: 4,
    question: "What are your desired monthly installments?",
    placeholder: "Enter desired monthly installments",
    key: "monthlyInstallments",
  },
  {
    id: 5,
    question: "What is your total family size (including yourself)?",
    placeholder: "Enter total family size",
    key: "familySize",
  },
  {
    id: 6,
    question: "What is the main purpose of the car?",
    placeholder: "E.g., commuting, family trips, off-road use",
    key: "purpose",
  },
];

const AIRecomendation = ({ setModalVisible }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [inputs, setInputs] = useState({
    salary: "",
    obligations: "",
    downPayment: "",
    monthlyInstallments: "",
    familySize: "",
    purpose: "",
  });
  const [aiResponse, setAiResponse] = useState(null);

  const promptString =
    `Current salary: ${inputs.salary}\n` +
    `Financial obligations: ${inputs.obligations}\n` +
    `Down payment amount: ${inputs.downPayment}\n` +
    `Desired monthly installments: ${inputs.monthlyInstallments}\n` +
    `Total family size: ${inputs.familySize}\n` +
    `Main purpose of the car: ${inputs.purpose}`;

  const aiPrompt = {
    prompt: promptString,
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setInputs({
      salary: "",
      obligations: "",
      downPayment: "",
      monthlyInstallments: "",
      familySize: "",
      purpose: "",
    });
    setAiResponse(null);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    mutate();
  };

  const { mutate } = useMutation({
    mutationFn: () => openAi(aiPrompt),
    onSuccess: (data) => {
      setAiResponse(data);
    },
  });

  const currentQ = questions[currentQuestion];

  const renderProgressSteps = () => {
    return (
      <View style={styles.stepsContainer}>
        {questions.map((_, index) => (
          <View key={index} style={styles.stepRow}>
            <View
              style={[
                styles.stepCircle,
                index === currentQuestion && styles.activeStep,
                index < currentQuestion && styles.completedStep,
              ]}
            >
              {index < currentQuestion ? (
                <Icon name="check" size={16} color="#fff" />
              ) : (
                <Text
                  style={[
                    styles.stepNumber,
                    index === currentQuestion && styles.activeStepNumber,
                  ]}
                >
                  {index + 1}
                </Text>
              )}
            </View>
            {index < questions.length - 1 && (
              <View
                style={[
                  styles.stepLine,
                  index < currentQuestion && styles.completedLine,
                ]}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {renderProgressSteps()}

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQ.question}</Text>
          <TextInput
            style={styles.input}
            value={inputs[currentQ.key]}
            onChangeText={(text) =>
              setInputs((prev) => ({ ...prev, [currentQ.key]: text }))
            }
            placeholder={currentQ.placeholder}
          />

          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={[
                styles.navButton,
                currentQuestion === 0 && styles.disabledButton,
              ]}
              onPress={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, styles.resetButton]}
              onPress={handleReset}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>

            {currentQuestion === questions.length - 1 ? (
              <TouchableOpacity
                style={[styles.navButton, styles.submitButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Get Recommendation</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            )}
          </View>

          {aiResponse && (
            <RecomendationCard
              aiResponse={aiResponse}
              setModalVisible={setModalVisible}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default AIRecomendation;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    borderRadius: 15,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 15,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  questionContainer: {
    flex: 1,
    gap: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
  navButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  resetButton: {
    backgroundColor: "#dc3545",
  },
  submitButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 20,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  activeStep: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  completedStep: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },
  stepNumber: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
  activeStepNumber: {
    color: "#fff",
  },
  stepLine: {
    width: 30,
    height: 2,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
  },
  completedLine: {
    backgroundColor: "#28a745",
  },
});
