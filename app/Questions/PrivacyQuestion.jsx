import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import styles from '../styling/QuestionStyle';

export default function PrivacyQuestion({ onNext }) {
  const [locationStatus, setLocationStatus] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState(null);

  // Function to request location permission
  const handleLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationStatus(status);

    if (status === 'granted') {
      console.log("Location permission granted");
      onNext('locationPermission', true);
    } else {
      Alert.alert(
        "Permission Required",
        "Location access is needed for full functionality.",
        [{ text: "OK" }]
      );
      onNext('locationPermission', false);
    }
  };

  // Function to request notification permission
  const handleNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setNotificationStatus(status);

    if (status === 'granted') {
      console.log("Notification permission granted");
      onNext('notificationPermission', true);
    } else {
      Alert.alert(
        "Permission Required",
        "Notification access is needed to keep you updated.",
        [{ text: "OK" }]
      );
      onNext('notificationPermission', false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Medical Character Image */}
      <Image 
        source={require('../../assets/images/pill.png')} // Update the path if needed
        style={styles.image}
      />

      {/* Privacy and Consent Text */}
      <Text style={styles.descriptionText}>
        Your comfort comes first; we guarantee your privacy, and we want to improve your experience.
      </Text>

      <Text style={styles.descriptionText}>
        To offer the full functionality of our app, we need your consent to share your location and receive push notifications.
      </Text>

      {/* Buttons for Permissions */}
      <TouchableOpacity 
        onPress={handleLocationPermission} 
        style={styles.permissionButton}
      >
        <Text style={styles.permissionButtonText}>
          {locationStatus === 'granted' ? '✔ Location Enabled' : 'Enable Location Sharing'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={handleNotificationPermission} 
        style={styles.permissionButton}
      >
        <Text style={styles.permissionButtonText}>
          {notificationStatus === 'granted' ? '✔ Notifications Enabled' : 'Enable Notifications'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
