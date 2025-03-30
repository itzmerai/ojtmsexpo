import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NoNotifHeader from "@/components/NoNotifHeader";
import AnalogClock from "react-native-clock-analog";

const Time = () => {
  const navigation = useNavigation();
  const [time, setTime] = useState(new Date());

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <NoNotifHeader
        title="Time"
        showBackButton={true}
        onBackPress={handleGoBack}
      />
      <View style={styles.clockContainer}>
        <AnalogClock
          colorClock="#2196F3" // Color of the clock face
          colorNumber="#000000" // Color of the numbers
          colorCenter="#00BCD4" // Color of the center circle
          colorHour="#FF5722" // Color of the hour hand
          colorMinutes="#009688" // Color of the minute hand
          colorSeconds="#FF0000" // Color of the seconds hand (added)
          hour={time.getHours()}
          minutes={time.getMinutes()}
          seconds={time.getSeconds()} // Pass the current seconds
        />
      </View>
      <Text style={styles.text}>{time.toLocaleTimeString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  clockContainer: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    color: "#2196F3",
  },
});

export default Time;
