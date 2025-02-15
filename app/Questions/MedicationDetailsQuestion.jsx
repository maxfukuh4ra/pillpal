import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Ensure correct import
import styles from '../styling/QuestionStyle';

export default function MedicationDetailsQuestion({ medicationCount, onNext, onBack }) {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    if (typeof medicationCount === 'number' && medicationCount > 0) {
      setMedications(
        Array.from({ length: medicationCount }, () => ({
          name: '',
          cadence: { number: '1', frequency: 'day' }
        }))
      );
    }
  }, [medicationCount]);

  const handleChange = (index, field, value) => {
    const updatedMedications = [...medications];
    if (field === 'number' || field === 'frequency') {
      updatedMedications[index].cadence[field] = value;
    } else {
      updatedMedications[index][field] = value;
    }
    setMedications(updatedMedications);
  };

  const handleNext = () => {
    onNext('medications', medications);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Enter your medications and cadences:</Text>

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

            {/* Row layout for How Many Times & Frequency */}
            <View style={styles.rowContainer}>
              {/* Number Picker (1-3) */}
              <View style={styles.pickerWrapper}>
                <Text style={styles.subHeader}>How many times?</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={med.cadence.number}
                    onValueChange={(value) => handleChange(index, 'number', value)}
                    style={styles.picker}
                  >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                  </Picker>
                </View>
              </View>

              {/* Frequency Selection Chips */}
              <View style={styles.chipWrapper}>
                <Text style={styles.subHeader}>Frequency</Text>
                <View style={styles.chipContainer}>
                  {['day', 'week'].map((freq) => (
                    <TouchableOpacity
                      key={freq}
                      style={[
                        styles.chip,
                        med.cadence.frequency === freq && styles.chipSelected,
                      ]}
                      onPress={() => handleChange(index, 'frequency', freq)}
                    >
                      <Text style={styles.chipText}>{`Per ${freq}`}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
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
          disabled={medications.some(med => !med.name)}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
