import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styling/QuestionStyle';

export default function MedicationDetailsQuestion({ medicationCount, onNext, onBack }) {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    if (typeof medicationCount === 'number' && medicationCount > 0) {
      setMedications(
        Array.from({ length: medicationCount }, () => ({
          name: '',
          timesPerDay: ''
        }))
      );
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
      <Text style={styles.header}>Enter your medications and dosage:</Text>

      {medicationCount > 0 ? (
        medications.map((med, index) => (
          <View key={index} style={styles.medicationRow}>
            {/* Medication Name Input */}
            <View style={styles.medicationInputWrapper}>
              <Text style={styles.subHeader}>Medication Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Aspirin"
                value={med.name}
                onChangeText={(value) => handleChange(index, 'name', value)}
              />
            </View>

            {/* Times Per Day Input */}
            <View style={styles.timesInputWrapper}>
              <Text style={styles.subHeader}>Times Per Day</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 2"
                value={med.timesPerDay}
                keyboardType="numeric"
                onChangeText={(value) => handleChange(index, 'timesPerDay', value)}
              />
            </View>
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
          disabled={medications.some(med => !med.name || !med.timesPerDay)}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
