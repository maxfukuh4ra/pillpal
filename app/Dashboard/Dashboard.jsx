import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import icon
import styles from '../styling/DashboardStyle';
import BottomNavBar from '../BottomNavBar';

const medications = [
  {
    id: '1',
    name: 'Aspirin',
    dosage: 'ASS, 500mg',
    brand: 'BAYER, coated pills',
    frequency: '2x Daily',
    reminders: ['6:00a - 8:30a', '5:00p - 7:00p'],
    image: require('../../assets/images/aspirin.png'),
    backgroundColor: '#F8C5C1', 
  },
  {
    id: '2',
    name: 'Omeprazole',
    dosage: 'Prilosec, 20mg',
    brand: 'AstraZeneca, capsule',
    frequency: '1x Daily',
    reminders: ['5:00p - 7:00p'],
    image: require('../../assets/images/omeprazole.png'),
    backgroundColor: '#A7E8F3', 
  },
];

export default function Dashboard() {
  const handleEditReminder = (medicationId) => {
    console.log(`Editing reminders for medication ID: ${medicationId}`);
    // Add navigation or modal functionality to edit reminders
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Image source={require('../../assets/images/pill.png')} style={styles.icon} />
        </View>

        {/* Weekly Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Your week</Text>
          </View>
          <View style={styles.summaryCard}></View>
        </View>

        {/* Today's Medications */}
        <Text style={styles.sectionTitle}>Today's Medications</Text>
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.medicationCard}>
              {/* Medication Info */}
              <View style={styles.medicationInfo}>
                <Text style={styles.medicationName}>{item.name}</Text>
                <Text style={styles.medicationDetails}>{item.dosage}</Text>
                <Text style={styles.medicationDetails}>{item.brand}</Text>
                <Text style={styles.medicationFrequency}>{item.frequency}</Text>

                {/* Reminders Section */}
                <View style={styles.reminderContainer}>
                  <View>
                    <Text style={styles.remindersTitle}>Reminders</Text>
                    {item.reminders.map((time, index) => (
                      <Text key={index} style={styles.reminderText}>{time}</Text>
                    ))}
                  </View>

                  {/* Edit Reminder Button */}
                  <TouchableOpacity 
                    onPress={() => handleEditReminder(item.id)} 
                    style={styles.editButton}
                  >
                    <MaterialCommunityIcons name="pencil" size={20} color="#555" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Medication Image (with background) */}
              <View style={[styles.medicationImageContainer, { backgroundColor: item.backgroundColor }]}>
                <Image source={item.image} style={styles.medicationImage} />
              </View>
            </View>
          )}
        />

        {/* Bottom Navigation */}
        <BottomNavBar />
      </View>
    </SafeAreaView>
  );
}
