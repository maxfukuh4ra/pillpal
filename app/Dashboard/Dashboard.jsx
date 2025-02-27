import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../firebaseconfig'; // Import Firestore and Auth
import { doc, getDoc } from 'firebase/firestore';
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
  
        console.log("✅ Logged-in user UID:", user.uid); // log UID for debugging
  
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
    fetchUserMedications();
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
