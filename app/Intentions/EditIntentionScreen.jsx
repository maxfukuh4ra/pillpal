import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styling/EditIntentionScreenStyle';
import BottomNavBar from '../BottomNavBar';

export default function EditIntentionScreen({ route }) {
  const navigation = useNavigation();
  const { medicationName, dosage, brand, frequency, reminders } = route.params || {};

  const [startTime, setStartTime] = useState(reminders?.[0] || '5:30PM');
  const [endTime, setEndTime] = useState(reminders?.[1] || '6:30PM');
  const [distance, setDistance] = useState('50');
  const [location, setLocation] = useState('Kitchen');
  const [timeReminderEnabled, setTimeReminderEnabled] = useState(false);
  const [locationReminderEnabled, setLocationReminderEnabled] = useState(false);

  const handleSave = () => {
    console.log('Updated Intention:', { medicationName, startTime, endTime, distance, location, timeReminderEnabled, locationReminderEnabled });
    navigation.goBack();
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
