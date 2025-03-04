import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "../../firebaseconfig";
import BottomNavBar from '../BottomNavBar';
import styles from '../styling/MedicationsScreenStyle';

export default function MedicationsScreen() {
  const navigation = useNavigation();
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (!user) {
          console.error("❌ No authenticated user found.");
          return;
        }

        const userDocRef = doc(FIREBASE_DB, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setMedications(userData.medications || []);
        } else {
          console.error("❌ User document not found.");
        }
      } catch (error) {
        console.error("❌ Error fetching medications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#ff7f7f" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
    <View style={styles.container}>
      <Text style={styles.header}>Your Medications</Text>
      
      <FlatList
        data={medications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicationCard}>
            <Ionicons name="information-circle-outline" size={24} color="#ff7f7f" />
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>{item.name}</Text>
              <Text style={styles.medicationDetails}> Intention: {item.intention_description} </Text>
              <Text style={styles.medicationDetails}> Times Per Day: {item.timesPerDay} </Text>
            </View>
            {item.imageUrl && (
              <Image source={{ uri: item.imageUrl }} style={styles.medicationImage} />
            )}
          </View>
        )}
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddMedication')}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      <BottomNavBar />
    </View>
    </SafeAreaView>
  );
}
