import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styling/EditIntentionScreenStyle';
import BottomNavBar from '../BottomNavBar';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "../../firebaseconfig"; 

export default function EditIntentionScreen({ route }) {
  const navigation = useNavigation();
  const { medicationName, dosage, brand, frequency, reminders } = route.params || {};
  const [loading, setLoading] = useState(true);

  const [startTime, setStartTime] = useState(reminders?.[0] || '5:30PM');
  const [endTime, setEndTime] = useState(reminders?.[1] || '6:30PM');
  const [distance, setDistance] = useState('50');
  const [location, setLocation] = useState('Kitchen');
  const [timeReminderEnabled, setTimeReminderEnabled] = useState(false);
  const [locationReminderEnabled, setLocationReminderEnabled] = useState(false);

  // fetch reminder data from firestore
  useEffect(() => {
    const fetchMedicationData = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (!user) {
          console.error("❌ No authenticated user found.");
          return;
        }
        const userDocRef = doc(FIREBASE_DB, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          console.error("❌ User document not found.");
          return;
        }

        let userData = userDocSnap.data();
        let medications = userData.medications || [];

        const medication = medications.find(
          (med) => med.name.trim().toLowerCase() === medicationName.trim().toLowerCase()
        );

        if (medication) {
          setStartTime(medication.reminders?.[0] || '5:30PM');
          setEndTime(medication.reminders?.[1] || '6:30PM');
          setDistance(medication.locationSettings?.distance || '50');
          setLocation(medication.locationSettings?.place || 'Kitchen');
          setTimeReminderEnabled(medication.reminders !== undefined);
          setLocationReminderEnabled(medication.locationSettings?.enabled || false);
        }
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching medication data:", error);
        setLoading(false);
      }
    };

    fetchMedicationData();
  }, [medicationName]);

  const handleSave = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (!user) {
        console.error("❌ No authenticated user found.");
        return;
      }
      const userDocRef = doc(FIREBASE_DB, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (!userDocSnap.exists()) {
        console.error("❌ User document not found.");
        return;
      }
  
      let userData = userDocSnap.data();
      let updatedMedications = [...userData.medications]; 
  
      const medicationIndex = updatedMedications.findIndex(
        (med) => med.name.trim().toLowerCase() === medicationName.trim().toLowerCase()
      );
  
      if (medicationIndex === -1) {
        console.error("❌ Medication not found in Firestore.");
        return;
      }
  
      updatedMedications[medicationIndex] = {
        ...updatedMedications[medicationIndex],
        reminders: timeReminderEnabled ? [startTime, endTime] : [], 
        locationSettings: {
          enabled: locationReminderEnabled,
          distance: locationReminderEnabled ? distance : null,
          place: locationReminderEnabled ? location : null,
        },
      };
  
      // push updated data to Firestore
      await updateDoc(userDocRef, { medications: updatedMedications });
  
      console.log("✅ Medication updated successfully in Firestore.");
      navigation.goBack();
    } catch (error) {
      console.error("❌ Error updating medication:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Header */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.header}>Edit Intention</Text>

          {/* Medication Information */}
          <View style={styles.medicationContainer}>
            <Ionicons name="medkit" size={24} color="pink" />
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>{medicationName || 'Unknown Medication'}</Text>
              <Text style={styles.medicationDetails}>{dosage}</Text>
              <Text style={styles.medicationDetails}>{brand}</Text>
              <Text style={styles.medicationFrequency}>{frequency}</Text>
            </View>
          </View>

          {/* Reminder Settings */}
          <Text style={styles.reminderHeader}>Remind Me:</Text>
          <View style={styles.reminderRow}>
            <Text style={styles.text}>Between</Text>
            <TextInput value={startTime} onChangeText={setStartTime} style={styles.input} />
            <Text style={styles.text}>and</Text>
            <TextInput value={endTime} onChangeText={setEndTime} style={styles.input} />
            <Switch value={timeReminderEnabled} onValueChange={setTimeReminderEnabled} />
          </View>

          <View style={styles.reminderRow}>
            <Text style={styles.text}>Within</Text>
            <TextInput value={distance} onChangeText={setDistance} style={styles.input} />
            <Text style={styles.text}>ft of</Text>
            <TextInput value={location} onChangeText={setLocation} style={styles.input} />
            <Switch value={locationReminderEnabled} onValueChange={setLocationReminderEnabled} />
          </View>

          {/* Save Button */}
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Set Intention</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavContainer}>
          <BottomNavBar />
        </View>
      </View>
    </SafeAreaView>
  );
}
