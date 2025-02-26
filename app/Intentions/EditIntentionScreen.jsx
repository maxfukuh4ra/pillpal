import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styling/EditIntentionScreenStyle';

export default function EditIntentionScreen({ route }) {
  const navigation = useNavigation();
  const [startTime, setStartTime] = useState('5:30PM');
  const [endTime, setEndTime] = useState('6:30PM');
  const [distance, setDistance] = useState('50');
  const [location, setLocation] = useState('Kitchen');
  const [timeReminderEnabled, setTimeReminderEnabled] = useState(false);
  const [locationReminderEnabled, setLocationReminderEnabled] = useState(false);

  const handleSave = () => {
    console.log('Updated Intention:', { startTime, endTime, distance, location, timeReminderEnabled, locationReminderEnabled });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.header}>Add Intention</Text>
      <Text style={styles.subHeader}>After coming home from work in the evening</Text>

      {/* Medication Information */}
      <View style={styles.medicationContainer}>
        <Ionicons name="medkit" size={24} color="yellow" />
        <View style={styles.medicationInfo}>
          <Text style={styles.medicationName}>Omega 3</Text>
          <Text style={styles.medicationDetails}>1 tablet after meals</Text>
          <Text style={styles.medicationDaysLeft}>7 days left</Text>
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
  );
}
