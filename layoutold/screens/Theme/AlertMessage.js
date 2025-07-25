import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AlertMessage = ({ extraData }) => {

  const alert = extraData.alert;
  const showAlert = alert.showAlert;
  const setShowAlert = alert.setShowAlert;
  const setAlertMessage = alert.setAlertMessage;
  const alertMessage = alert.alertMessage;
  const alertType = alert.alertType;
  const setAlertType = alert.setAlertType;

  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateYAnim] = useState(new Animated.Value(-50));

  useEffect(() => {
    if (showAlert) {
      // Show alert (fade in + slide down)
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();

      // Hide after 2 seconds (fade out + slide up)
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: -50,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => setShowAlert(false));
      }, 2000);
    }
  }, [showAlert]);

  if (!showAlert) return null; // Hide component when not active

  return (
    <Animated.View
      style={[
        styles.alert,
        { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
        { backgroundColor: alertType === 1 ? "#dff0d8" : "#f2dede" },
      ]}
    >
      <Text style={styles.alertTitle}>
      {alertType === 1 ? "Success! " : "Warning! "} <Text style={styles.alertText}>{alertMessage}</Text>
      </Text>
      <Icon name={'times'} size={20} style={styles.alertIcon} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alert: {
    position: "absolute",
    top: 20,
    left: "5%",
    transform: [{ translateX: -150 }], // Center horizontally
    // backgroundColor: "#dff0d8",
    padding: 15,
    borderRadius: 10,
    width: 'auto',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
    zIndex: 1000,
  },
  alertTitle: {
    color: "#3c763d",
    fontSize: 16,
    fontWeight: "bold",
  },
  alertText: {
    color: "#3c763d",
    fontSize: 14,
  },
  alertIcon: {
    color: "#3c763d",
    marginLeft: 10,
  }, 
});

export default AlertMessage;
 