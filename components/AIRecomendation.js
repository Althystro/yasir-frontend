import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import openAi from "../api/openAi";
import { deleteToken } from "../api/storage";
import UserContext from "../context/UserContext";

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

const AIRecomendation = () => {
  const [user, setUser] = useContext(UserContext);
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
  const { displayedText, isTyping } = useTypingAnimation(
    aiResponse?.reasons || ""
  );

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

  const handleLogout = () => {
    deleteToken();
    setUser(false);
  };

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
                Recommended Car
                {isTyping && <Text style={styles.typingIndicator}>...</Text>}
              </Text>

              <View style={styles.carInfoContainer}>
                <Text style={styles.carName}>{aiResponse.carName}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>Price:</Text>
                  <Text style={styles.carPrice}>
                    ${Number(aiResponse.price).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>Monthly Installment:</Text>
                  <Text style={styles.carPrice}>
                    ${Number(aiResponse.installments).toLocaleString()}
                  </Text>
                </View>
              </View>

              <Text style={styles.reasonsTitle}>Why this car?</Text>
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

export default AIRecomendation;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
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
  responseContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  carInfoContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#eee",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  priceLabel: {
    fontSize: 16,
    color: "#666",
  },
  carName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  carPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: "#28a745",
  },
  reasonsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },
  responseTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  typingIndicator: {
    color: "#666",
    fontSize: 24,
    marginLeft: 4,
  },
  logoutButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
});
