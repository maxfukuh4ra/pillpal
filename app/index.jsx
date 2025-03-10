import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import { FIREBASE_DB, FIREBASE_AUTH } from '../firebaseconfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import LoginScreen from './IntroScreens/LoginScreen';
import QuestionScreen from './IntroScreens/QuestionScreen';
import ForgotPasswordScreen from './IntroScreens/ForgotScreen';
import Dashboard from './Dashboard/Dashboard';
import MedicationsScreen from './Screens/Medications';
import NewMedicationScreen from './Screens/NewMedicationScreen';
import EditIntentionScreen from './Intentions/EditIntentionScreen';
import MapPickerScreen from './services/MapPickerScreen';
import Progress from './Screens/Progress';
import { startLocationTracking } from './services/LocationTracking';

// Config notifications to display while the app is running
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();

export default function Index() {
  useEffect(() => {
    startLocationTracking(); // Start location tracking when app starts

    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (!user) {
        console.log("❌ No user is logged in yet. Skipping activity tracking.");
        return;
      }
    
      // debugging
      // console.log("✅ User is logged in:", user.uid);
      // const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      // console.log(`📅 Today's date: ${today}`);
      // const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
      // console.log(`🔍 Fetching document for user UID: ${user.uid}`);
    
      // fetch data from db
      try {
        const userDoc = await getDoc(userDocRef);
        let activityDays = {};
        if (userDoc.exists()) {
          activityDays = userDoc.data().activityDays || {};
          console.log("✅ User document found. Current activityDays:", activityDays);
        } else {
          console.log("⚠️ User document does not exist. Creating a new user document.");
          
          // if user document doesn't exist, create it with activityDays
          await setDoc(userDocRef, { activityDays: {} }, { merge: true });
          console.log("🆕 Created a new user document with activityDays.");
        }
    
        // change past dates to green
        Object.keys(activityDays).forEach(date => {
          if (date !== today) {
            activityDays[date].selectedColor = '#66BB6A';
          }
        });
    
        // log todays date if not present, using light blue
        if (!activityDays[today]) {
          console.log(`🔵 Logging new activity for today (${today}).`);
          activityDays[today] = { selected: true, selectedColor: '#B3E5FC' }; 
        }
    
        // save and send to backend 
        await setDoc(userDocRef, { activityDays }, { merge: true });
        console.log("✅ Successfully logged today's activity:", activityDays);
    
        // debugging
        const updatedDoc = await getDoc(userDocRef);
        console.log("🔄 Post-update Firestore document:", updatedDoc.data());
    
      } catch (error) {
        console.error("❌ Error fetching or updating Firestore document:", error);
      }
    });
    
    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="QuestionScreen" component={QuestionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="EditIntention" component={EditIntentionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MapPickerScreen" component={MapPickerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Medications" component={MedicationsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewMedicationScreen" component={NewMedicationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Progress" component={Progress} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
