import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styling/QuestionStyle';

export default function MedicationDetailsQuestion({ medicationCount, onNext, onBack }) {
  const [medications, setMedications] = useState([]);

  // Debug: Check the received medication count
  console.log('Medication Count:', medicationCount);

  // Initialize medications array when medicationCount is received
  useEffect(() => {
    if (medicationCount && medicationCount > 0) {
      setMedications(Array.from({ length: medicationCount }, () => ({ name: '', cadence: '' })));
    }
  }, [medicationCount]);

  const handleChange = (index, field, value) => {
    const updatedMedications = [...medications];
    updatedMedications[index][field] = value;
    setMedications(updatedMedications);
  };

  const handleNext = () => {
    onNext('medications', medications);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Enter your medications and cadences:</Text>

      {/* Ensure inputs only show when medicationCount is valid */}
      {medicationCount > 0 ? (
        medications.map((med, index) => (
          <View key={index} style={styles.medicationInputContainer}>
            <Text style={styles.subHeader}>Medication {index + 1}</Text>
            <TextInput
              style={styles.input}
              placeholder="Medication Name"
              value={med.name}
              onChangeText={(value) => handleChange(index, 'name', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Cadence (e.g., Once a day)"
              value={med.cadence}
              onChangeText={(value) => handleChange(index, 'cadence', value)}
            />
          </View>
        ))
      ) : (
        <Text style={styles.errorText}>Invalid medication count. Please go back and enter a number.</Text>
      )}

      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={onBack} style={styles.navigationButton}>
          <Text style={styles.nextButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleNext} 
          style={styles.navigationButton} 
          disabled={medications.some(med => !med.name || !med.cadence)}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
