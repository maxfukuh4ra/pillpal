import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { FIREBASE_AUTH } from '../../firebaseconfig';

import MedicationCountQuestion from '../Questions/MedicationCountQuestion';
import MedicationDetailsQuestion from '../Questions/MedicationDetailsQuestion';
import PrivacyQuestion from '../Questions/PrivacyQuestion';
import EmailPasswordQuestion from '../Questions/EmailandPassword';
import NameQuestion from '../Questions/NameQuestion';
import styles from "../styling/QuestionStyle";
import ProgressBar from '../Questions/ProgressBar';

export default function QuestionScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const navigation = useNavigation(); 
  const auth = FIREBASE_AUTH;

  const totalSteps = 5;

  const handleNext = async (key, value) => {
    setResponses(prevResponses => ({ ...prevResponses, [key]: value }));

    console.log('Responses so far:', responses);

    if (currentStep + 1 >= totalSteps) {
      try {
        const email = responses.email;
        const password = responses.password;

        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log("✅ Account Created Successfully");
        navigation.replace('Dashboard');
      } catch (error) {
        alert('Error creating account. Please try again.');
        console.error("❌ Error creating account: ", error.message);
      }
    } else {
      setCurrentStep(currentStep + 1); 
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={currentStep + 1} totalSteps={totalSteps} />
      {currentStep === 0 && <EmailPasswordQuestion onNext={handleNext} onBack={handleBack} />}
      {currentStep === 1 && <NameQuestion onNext={handleNext} onBack={handleBack} />}
      {currentStep === 2 && <MedicationCountQuestion onNext={handleNext} onBack={handleBack} />}
      {currentStep === 3 && responses.medicationCount !== undefined && (
        <MedicationDetailsQuestion medicationCount={responses.medicationCount} onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 4 && <PrivacyQuestion onNext={handleNext} onBack={handleBack} />}
    </View>
  );  
}
