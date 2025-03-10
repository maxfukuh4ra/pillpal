import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';

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

// config notifications to display while the app is running
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

    const logAppOpen = async () => {
      const user = FIREBASE_AUTH.currentUser;
      if (!user) {
        console.log("❌ No user is logged in. Skipping activity tracking.");
        return;
      }

      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      console.log(`📅 Today's date: ${today}`);

      const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
      console.log(`🔍 Fetching document for user UID: ${user.uid}`);

      try {
        const userDoc = await getDoc(userDocRef);

        let activityDays = {};
        if (userDoc.exists()) {
          activityDays = userDoc.data().activityDays || {};
          console.log("✅ User document found. Current activityDays:", activityDays);
        } else {
          console.log("⚠️ User document does not exist. Creating a new activity tracker.");
        }

        // Check if today's date is already logged
        if (activityDays[today]) {
          console.log(`🟢 Activity already logged for today (${today}). No update needed.`);
        } else {
          console.log(`🔵 Logging new activity for today (${today}).`);
          activityDays[today] = { selected: true, selectedColor: '#B3E5FC' }; // Light blue for today

          await setDoc(userDocRef, { activityDays }, { merge: true });
          console.log("✅ Successfully logged today's activity:", activityDays);
        }
      } catch (error) {
        console.error("❌ Error fetching or updating Firestore document:", error);
      }
    };

    logAppOpen();
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuestionScreen"
          component={QuestionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditIntention"
          component={EditIntentionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MapPickerScreen"
          component={MapPickerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Medications"
          component={MedicationsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewMedicationScreen"
          component={NewMedicationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Progress"
          component={Progress}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
