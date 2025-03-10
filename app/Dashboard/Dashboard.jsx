import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../firebaseconfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import styles from '../styling/DashboardStyle';
import BottomNavBar from '../BottomNavBar';

export default function Dashboard() {
  const navigation = useNavigation();
  const [medications, setMedications] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserMedications = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser; // get logged-in user
        if (!user) {
          console.error("❌ No authenticated user found.");
          return;
        }
  
        console.log("✅ Logged-in user UID:", user.uid); // Debugging
  
        const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("✅ User document found:", userData);
          setMedications(userData.medications || []);
        } else {
          console.error("❌ User document not found for UID:", user.uid);
        }
      } catch (error) {
        console.error("❌ Error fetching medications:", error);
      } finally {
        setLoading(false);
      }
    };

    const logAppOpen = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (!user) {
          console.log("❌ No user is logged in. Skipping activity tracking.");
          return;
        }

        console.log("✅ User is logged in:", user.uid);

        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        console.log(`📅 Today's date: ${today}`);

        const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
        console.log(`🔍 Fetching document for user UID: ${user.uid}`);

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
            activityDays[date].selectedColor = '#66BB6A'; // Green for past logged days
          }
        });

        // log today's day if not present
        if (!activityDays[today]) {
          console.log(`🔵 Logging new activity for today (${today}).`);
          activityDays[today] = { selected: true, selectedColor: '#B3E5FC' }; // Light blue for today
        }

        // save the updated activityDays to backend
        await setDoc(userDocRef, { activityDays }, { merge: true });
        console.log("✅ Successfully logged today's activity:", activityDays);

        // debug
        const updatedDoc = await getDoc(userDocRef);
        console.log("🔄 Post-update Firestore document:", updatedDoc.data());

      } catch (error) {
        console.error("❌ Error fetching or updating Firestore document:", error);
      }
    };

    fetchUserMedications();
    logAppOpen(); // Run this when Dashboard is loaded
  }, []);
  

  const handleEditReminder = (medication) => {
    console.log(`Editing reminders for medication: ${medication.name}`);
    navigation.navigate('EditIntention', {
      medicationName: medication.name,
      timesPerDay: medication.timesPerDay,
    });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Image source={require('../../assets/images/pill.png')} style={styles.icon} />
        </View>

        {/* Display Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <>
            <Text style={styles.sectionTitle}>Today's Medications</Text>
            <FlatList
              data={medications}
              keyExtractor={(item, index) => index.toString()} // Ensure unique keys
              renderItem={({ item }) => (
                <View style={styles.medicationCard}>
                  {/* Medication Info */}
                  <View style={styles.medicationInfo}>
                    <Text style={styles.medicationName}>{item.name}</Text>
                    <Text style={styles.medicationDetails}>Times per day: {item.timesPerDay}</Text>

                    {/* Edit Reminder Button */}
                    <TouchableOpacity onPress={() => handleEditReminder(item)} style={styles.editButton}>
                      <MaterialCommunityIcons name="pencil" size={20} color="#555" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </>
        )}

        {/* Bottom Navigation */}
        <BottomNavBar />
      </View>
    </SafeAreaView>
  );
}
