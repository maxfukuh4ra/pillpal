import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styling/QuestionStyle';

export default function MedicationCountQuestion({ onNext, onBack }) {
  const [medCount, setMedCount] = useState('');

  const handleNext = () => {
    const count = parseInt(medCount, 10);
    if (!isNaN(count) && count > 0) {
      onNext('medicationCount', count);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>How many medications do you take?</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter a number"
        value={medCount}
        onChangeText={setMedCount}
      />
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={onBack} style={styles.navigationButton}>
          <Text style={styles.nextButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          style={styles.navigationButton}
          disabled={!medCount || isNaN(parseInt(medCount, 10))}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
