import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styling/NewMedicationStyle';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "../../firebaseconfig"; 

export default function NewMedicationScreen() {
  const navigation = useNavigation();
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [intentionDescription, setIntentionDescription] = useState('');
  const [startTime, setStartTime] = useState('5:30PM');
  const [endTime, setEndTime] = useState('6:30PM');
  const [distance, setDistance] = useState('50');
  const [location, setLocation] = useState('Home');
  const [timeReminderEnabled, setTimeReminderEnabled] = useState(false);
  const [locationReminderEnabled, setLocationReminderEnabled] = useState(false);

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
      let updatedMedications = [...(userData.medications || [])];

      // Add the new medication
      const newMedication = {
        name: medicationName.trim(),
        dosage,
        frequency,
        intention_description: intentionDescription,
        reminders: timeReminderEnabled ? [startTime, endTime] : [],
        locationSettings: {
          enabled: locationReminderEnabled,
          distance: locationReminderEnabled ? distance : null,
          place: locationReminderEnabled ? location : null,
        },
      };

      updatedMedications.push(newMedication);

      // Update Firestore
      await updateDoc(userDocRef, { medications: updatedMedications });

      console.log("✅ New medication added successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("❌ Error adding medication:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>Add New Medication</Text>

        {/* Medication Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Medication Name:</Text>
          <TextInput
            value={medicationName}
            onChangeText={setMedicationName}
            placeholder="e.g., Aspirin"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </View>

        {/* Dosage */}
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Dosage:</Text>
          <TextInput
            value={dosage}
            onChangeText={setDosage}
            placeholder="e.g., 500mg"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </View>

        {/* Frequency */}
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Frequency:</Text>
          <TextInput
            value={frequency}
            onChangeText={setFrequency}
            placeholder="e.g., Twice a day"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </View>

        {/* Intention Description */}
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Intention Description:</Text>
          <TextInput
            value={intentionDescription}
            onChangeText={setIntentionDescription}
            placeholder="e.g., Before dinner"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
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
          <TouchableOpacity
                style={styles.input}
                onPress={() => navigation.navigate("MapPickerScreen", {
                  initialLocation: location,
                  returnScreen: "NewMedicationScreen", // Tell MapPicker to return here
                  // medicationName,
                  // dosage,
                  // brand,
                  // frequency,
                  // reminders,
                })}
          >
            <Text>{location || 'Select Location'}</Text>
          </TouchableOpacity>
          <Switch value={locationReminderEnabled} onValueChange={setLocationReminderEnabled} />
        </View>

        {/* Save Button */}
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Add Medication</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
