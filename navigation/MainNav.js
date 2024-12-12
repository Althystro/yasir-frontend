import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { deleteToken } from "../api/storage";
import UserContext from "../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import openAi from "../api/openAi";

const useTypingAnimation = (text, speed = 1) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      return;
    }

    setIsTyping(true);
    let index = 0;
    setDisplayedText("");

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((current) => current + text.charAt(index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isTyping };
};

const questions = [
  {
    id: 1,
    question: "What is your down payment amount?",
    placeholder: "Enter down payment amount",
    key: "downPayment",
  },
  {
    id: 2,
    question: "What is your desired monthly installment?",
    placeholder: "Enter desired monthly installment",
    key: "monthlyInstallment",
  },
  {
    id: 3,
    question: "What is your family size?",
    placeholder: "Enter total family size",
    key: "familySize",
  },
  {
    id: 4,
    question: "What is the main purpose of the car?",
    placeholder: "Enter main purpose of the car",
    key: "purpose",
  },
  {
    id: 5,
    question: "Do you prefer a new or used car?",
    placeholder: "Enter preferred car condition",
    key: "carCondition",
  },
  {
    id: 6,
    question: "Do you have any specific brand preferences?",
    placeholder: "Enter brand preferences",
    key: "brandPreference",
  },
];

const MainNav = () => {
  const [user, setUser] = useContext(UserContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [inputs, setInputs] = useState({
    downPayment: "",
    monthlyInstallment: "",
    familySize: "",
    purpose: "",
    carCondition: "",
    brandPreference: "",
  });
  const [aiResponse, setAiResponse] = useState("");
  const { displayedText, isTyping } = useTypingAnimation(aiResponse);

  const promptString =
    `Down payment amount: ${inputs.downPayment}\n` +
    `Desired monthly installment amount: ${inputs.monthlyInstallment}\n` +
    `Total family size: ${inputs.familySize}\n` +
    `Main purpose of the car: ${inputs.purpose}\n` +
    `Car condition preference: ${inputs.carCondition}\n` +
    `Specific car brand preferences: ${inputs.brandPreference}`;

  const aiPrompt = {
    prompt: promptString,
  };

  const handleLogout = () => {
    deleteToken();
    setUser(false);
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

  const handleReset = () => {
    setCurrentQuestion(0);
    setInputs({
      downPayment: "",
      monthlyInstallment: "",
      familySize: "",
      purpose: "",
      carCondition: "",
      brandPreference: "",
    });
    setAiResponse("");
  };

  const { mutate } = useMutation({
    mutationFn: () => openAi(aiPrompt),
    onSuccess: (data) => {
      setAiResponse(data);
    },
  });

  const currentQ = questions[currentQuestion];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentQuestion + 1} of {questions.length}
          </Text>
        </View>

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
            <View style={styles.responseContainer}>
              <Text style={styles.responseTitle}>
                Recommendation
                {isTyping && <Text style={styles.typingIndicator}>...</Text>}
              </Text>
              <Text style={styles.responseText}>{displayedText}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MainNav;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingTop: 50,
  },
  container: {
    flex: 1,
    padding: 20,
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
  submitButton: {
    backgroundColor: "#28a745",
  },
  logoutButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  responseContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  resetButton: {
    backgroundColor: "#dc3545",
  },
  typingIndicator: {
    color: "#666",
    fontSize: 24,
    marginLeft: 4,
  },
});
