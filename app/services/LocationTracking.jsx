import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from "../../firebaseconfig";

const LOCATION_TASK_NAME = "background-location-task";

// Define background location task
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("❌ Background location error:", error);
    return;
  }

  if (data) {
    const { locations } = data;
    const userLocation = locations[0].coords;
    console.log("📍 User Location:", userLocation);

    const user = FIREBASE_AUTH.currentUser;
    if (!user) return;

    const userDocRef = doc(FIREBASE_DB, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) return;

    let userData = userDocSnap.data();
    let medications = userData.medications || [];

    for (const med of medications) {
      if (med.locationSettings?.enabled) {
        const targetLat = userData.location?.latitude;
        const targetLon = userData.location?.longitude;
        const distanceLimit = med.locationSettings?.distance || 10;

        const distance = getDistance(userLocation.latitude, userLocation.longitude, targetLat, targetLon);
        
        if (distance <= distanceLimit) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Medication Reminder",
              body: `You're near ${med.locationSettings.place}. Don't forget to take your ${med.name}!`,
              sound: true,
            },
            trigger: { seconds: 1 },
          });

          console.log(`✅ Notification sent for ${med.name}`);
        }
      }
    }
  }
});

// Function to calculate distance between two coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000;
};

// Start location tracking
export const startLocationTracking = async () => {
  const { status } = await Location.requestBackgroundPermissionsAsync();
  if (status === "granted") {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      timeInterval: 60000,
      distanceInterval: 10,
    });
  } else {
    console.error("❌ Location permission denied for background tracking.");
  }
};
