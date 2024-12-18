import React, { useContext, useState } from "react";
import {
  View,
  Button,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TestDriveContext from "../context/TestDriveContext";

const DateTimeCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [TestDrive, setTestDrive] = useContext(TestDriveContext);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const formattedDate = currentDate.toDateString();
    setDate(currentDate);
    setTestDrive({ ...TestDrive, date: formattedDate });
  };

  return (
    <View style={styles.container}>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default DateTimeCalendar;
