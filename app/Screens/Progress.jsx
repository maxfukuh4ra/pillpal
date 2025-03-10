import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../firebaseconfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import BottomNavBar from '../BottomNavBar';

export default function ProgressScreen() {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const fetchUserActivity = async () => {
      const user = FIREBASE_AUTH.currentUser;
      if (!user) return;
      
      const today = new Date().toISOString().split('T')[0];
      const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      let activityDays = {};
      if (userDoc.exists()) {
        activityDays = userDoc.data().activityDays || {};
      }

      // mark today's date with a light blue bubble
      activityDays[today] = { selected: true, selectedColor: '#B3E5FC' };
      
      await setDoc(userDocRef, { activityDays }, { merge: true });
      setMarkedDates(activityDays);
    };
    fetchUserActivity();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Progress In-Depth</Text>
      <Calendar
        markingType={'custom'}
        markedDates={markedDates}
        theme={{
          todayTextColor: '#000',
          arrowColor: '#00BFFF',
        }}
      />

      {/* Progress Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>Surpassing 85% users in your city!</Text>
        <Text style={styles.summaryText}>Adding 1.5 months to your life expectancy</Text>
      </View>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222', padding: 15 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  summaryCard: { backgroundColor: '#333', padding: 15, borderRadius: 10, marginTop: 20 },
  summaryText: { color: '#fff', fontSize: 16 },
});