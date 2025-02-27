import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import * as Location from 'expo-location'
import * as Notifications from 'expo-notifications'
import styles from '../styling/QuestionStyle'
import { submitUserData } from '../services/SubmitUserData'
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../firebaseconfig';

export default function PrivacyQuestion({ onNext, onBack, userData }) {
  const [locationStatus, setLocationStatus] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState(null)
  const [location, setLocation] = useState(null)

  // Function to request location permission
  const handleLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    setLocationStatus(status)

    if (status === 'granted') {
      console.log('✅ Location permission granted')
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10
        },
        (newLocation) => {
          console.log('📍 New Location:', newLocation.coords)
          setLocation(newLocation.coords)
        }
      )
      return locationSubscription
    } else {
      Alert.alert(
        'Permission Denied',
        'Location access is required for full functionality.',
        [{ text: 'OK' }]
      )
    }
  }

  // Function to request notification permission
  const handleNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync()
    setNotificationStatus(status)

    if (status === 'granted') {
      console.log('✅ Notification permission granted')

      // Schedule a test notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Reminder',
          body: "Don't forget to take your medication!"
        },
        trigger: { seconds: 10 }
      })
    } else {
      Alert.alert(
        'Permission Denied',
        'Notification access is required for reminders.',
        [{ text: 'OK' }]
      )
    }
  }

  // const handleSubmit = async () => {
  //   console.log('User data received in PrivacyQuestion: ', userData)

  //   // flatten nested objects before submitting to Firestore
  //   const finalUserData = {
  //     email: userData.credentials?.email,
  //     password: userData.credentials?.password,
  //     name: userData.nameBirthday?.name,
  //     birthday: userData.nameBirthday?.birthday,
  //     medicationCount: userData.medicationCount,
  //     medications: userData.medications,
  //     location: location
  //       ? {
  //           latitude: location.latitude,
  //           longitude: location.longitude
  //         }
  //       : null,
  //     notificationsEnabled: notificationStatus === 'granted',
  //     locationPermissionGranted: locationStatus === 'granted'
  //   }

  //   try {
  //     await submitUserData(finalUserData) // call the function to send flattened data to Firestore
  //     console.log('User data submitted successfully with all responses')
  //     onNext('permissionsGranted', true) // proceed to the next screen
  //   } catch (error) {
  //     console.error('Error submitting user data: ', error)
  //   }
  // }

const handleSubmit = async () => {
  console.log('User data received in PrivacyQuestion: ', userData);

  try {
    console.log("🚀 Creating user account...");
    const response = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      userData.credentials?.email,
      userData.credentials?.password
    );
    const user = response.user;
    console.log("✅ User created successfully:", user.uid);

    const finalUserData = {
      email: userData.credentials?.email,
      name: userData.nameBirthday?.name,
      birthday: userData.nameBirthday?.birthday,
      medicationCount: userData.medicationCount,
      medications: userData.medications || [],
      location: location
        ? {
            latitude: location.latitude,
            longitude: location.longitude
          }
        : null,
      notificationsEnabled: notificationStatus === 'granted',
      locationPermissionGranted: locationStatus === 'granted'
    };

    console.log("📡 Storing user data in Firestore...");
    await setDoc(doc(FIREBASE_DB, 'users', user.uid), finalUserData);
    console.log("✅ User data successfully stored in Firestore.");
    
    console.log("🚀 Navigating to Dashboard...");
    onNext('permissionsGranted', true); 

  } catch (error) {
    console.error("❌ Error creating user or storing data:", error.message);
    alert("Error creating account: " + error.message);
  }
};


  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/pill.png')}
        style={styles.image}
      />
      <Text style={styles.descriptionText}>
        Your comfort comes first; we guarantee your privacy, and we want to
        improve your experience.
      </Text>
      <Text style={styles.descriptionText}>
        To offer the full functionality of our app, we need your consent to
        share your location and receive push notifications.
      </Text>

      {/* Buttons for Permissions */}
      <TouchableOpacity
        onPress={handleLocationPermission}
        style={styles.permissionButton}
      >
        <Text style={styles.permissionButtonText}>
          {locationStatus === 'granted'
            ? '✔ Location Enabled'
            : 'Enable Location Sharing'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleNotificationPermission}
        style={styles.permissionButton}
      >
        <Text style={styles.permissionButtonText}>
          {notificationStatus === 'granted'
            ? '✔ Notifications Enabled'
            : 'Enable Notifications'}
        </Text>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={onBack} style={styles.navigationButton}>
          <Text style={styles.nextButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.navigationButton}
          disabled={
            !(locationStatus === 'granted' && notificationStatus === 'granted')
          }
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
