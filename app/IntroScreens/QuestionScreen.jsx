import React, { useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../firebaseconfig'

import MedicationCountQuestion from '../Questions/MedicationCountQuestion'
import MedicationDetailsQuestion from '../Questions/MedicationDetailsQuestion'
import PrivacyQuestion from '../Questions/PrivacyQuestion'
import EmailPasswordQuestion from '../Questions/EmailandPassword'
import NameQuestion from '../Questions/NameQuestion'
import styles from '../styling/QuestionStyle'
import ProgressBar from '../Questions/ProgressBar'

export default function QuestionScreen() {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState({})
  const navigation = useNavigation()
  const auth = FIREBASE_AUTH

  const totalSteps = 5

  const handleNext = async (key, value) => {
    // Construct the updated responses immediately
    const updatedResponses = { ...responses, [key]: value }
    setResponses(updatedResponses) // Update state with the new data

    console.log('Responses so far:', updatedResponses) // This will now show the latest data

    console.log(updatedResponses.email)
    console.log(updatedResponses.password)

    if (currentStep + 1 >= totalSteps) {
      try {
        const email = updatedResponses.credentials?.email
        const password = updatedResponses.credentials?.password

        // Create user account
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        console.log('✅ Account Created Successfully')

        // Navigate to Dashboard only after successful account creation
        navigation.replace('Dashboard')
      } catch (error) {
        alert('Error creating account. Please try again.')
        console.error('❌ Error creating account: ', error.message)
      }
    } else {
      setCurrentStep(currentStep + 1) // Move to the next question
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={currentStep + 1} totalSteps={totalSteps} />
      {currentStep === 0 && (
        <EmailPasswordQuestion onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 1 && (
        <NameQuestion onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 2 && (
        <MedicationCountQuestion onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 3 && responses.medicationCount !== undefined && (
        <MedicationDetailsQuestion
          medicationCount={responses.medicationCount}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 4 && (
        <PrivacyQuestion
          onNext={handleNext}
          onBack={handleBack}
          userData={responses}
        />
      )}
    </View>
  )
}
