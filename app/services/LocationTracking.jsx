import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from "../../firebaseconfig";

// goal: notify when within a certain distance of a location

const LOCATION_TASK_NAME = 'background-location-task';

// haversine formula function to calculate the distance between two coordinates
const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // radius of earth in meters
  const toRad = (deg) => (deg * Math.PI) / 180;
  
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c; // dist in meters
};

// define the background task that runs automatically
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("❌ Location tracking error:", error);
    return;
  }

  if (data) {
    const { locations } = data;
    // if no location data, return
    if (!locations || locations.length === 0) return;

    // fetch user
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      console.log("❌ No authenticated user found.");
      return;
    }
    // goes to users colletion and gets doc
    const userDocRef = doc(FIREBASE_DB, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      console.log("❌ User document not found.");
      return;
    }

    const userData = userDocSnap.data();
    const medications = userData.medications || [];
    const currentLocation = locations[0].coords; // extract latest location

    // loop through medications to check proximity for all of them
    medications.forEach((medication) => {
      if (medication.locationSettings?.enabled && medication.locationSettings.coordinates) {
        // extract and calculate distance
        const { latitude, longitude } = medication.locationSettings.coordinates;
        const distanceInMeters = getDistanceFromLatLonInMeters(
          currentLocation.latitude, 
          currentLocation.longitude, 
          latitude, 
          longitude
        );

        const distanceThreshold = (parseFloat(medication.locationSettings.distance) || 10) * 0.3048; // convert ft to meters for comparison

        if (distanceInMeters <= distanceThreshold) {
          // send notification
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Medication Reminder",
              body: `You're near ${medication.locationSettings.place}. Time to take ${medication.name}!`,
            },
            trigger: null, // immediate notification
          });

          // debug
          console.log(`✅ Notification sent for ${medication.name} at ${distanceInMeters} meters`);
        }
      }
    });
  }
});

// function to start background tracking
export const startLocationTracking = async () => {
  // request location access when app in use
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error("❌ Location permission denied.");
    return;
  }
  // request location permission access when app in bgd use
  const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
  if (bgStatus !== 'granted') {
    console.error("❌ Background location permission denied.");
    return;
  }

  // start location tracking
  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.High,
    timeInterval: 10000, // check every 10 seconds
    // distanceInterval: 10, // check every 10 meters
    foregroundService: {
      notificationTitle: "Location Tracking",
      notificationBody: "Your location is being tracked for medication reminders.",
    },
  });

  console.log("📍 Background location tracking started.");
};