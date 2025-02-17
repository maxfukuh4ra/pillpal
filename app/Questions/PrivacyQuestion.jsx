import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import styles from '../styling/QuestionStyle';

export default function PrivacyQuestion({ onNext, onBack }) {
  const [locationStatus, setLocationStatus] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState(null);
  const [location, setLocation] = useState(null);

  // Function to request location permission
  const handleLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationStatus(status);

    if (status === 'granted') {
      console.log("✅ Location permission granted");
      // Start tracking location
      const locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
        (newLocation) => {
          console.log("📍 New Location:", newLocation.coords);
          setLocation(newLocation.coords);
        }
      );
      return locationSubscription;
    } else {
      Alert.alert(
        "Permission Denied",
        "Location access is required for full functionality.",
        [{ text: "OK" }]
      );
    }
  };

  // Function to request notification permission
  const handleNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setNotificationStatus(status);

    if (status === 'granted') {
      console.log("✅ Notification permission granted");

      // Schedule a test notification after permission is granted
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder",
          body: "Don't forget to take your medication!",
        },
        trigger: { seconds: 10 }, // Sends a notification after 10 seconds
      });
    } else {
      Alert.alert(
        "Permission Denied",
        "Notification access is required for reminders.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Medical Character Image */}
      <Image 
        source={require('../../assets/images/pill.png')} 
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
      <TouchableOpacity onPress={handleLocationPermission} style={styles.permissionButton}>
        <Text style={styles.permissionButtonText}>
          {locationStatus === 'granted' ? '✔ Location Enabled' : 'Enable Location Sharing'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNotificationPermission} style={styles.permissionButton}>
        <Text style={styles.permissionButtonText}>
          {notificationStatus === 'granted' ? '✔ Notifications Enabled' : 'Enable Notifications'}
        </Text>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={onBack} style={styles.navigationButton}>
          <Text style={styles.nextButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => onNext('permissionsGranted', true)} 
          style={styles.navigationButton} 
          disabled={!(locationStatus === 'granted' && notificationStatus === 'granted')}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
