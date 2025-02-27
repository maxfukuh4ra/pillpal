import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function MapPickerScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { initialLocation } = route.params || {}; // Get initial location if passed

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true); // Show loading indicator

  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Location permission is required to select a location.');
        setSelectedLocation(initialLocation || { latitude: 37.7749, longitude: -122.4194 }); // Default SF
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setSelectedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLoading(false);
    };

    getCurrentLocation();
  }, []);

  const handleSelectLocation = (event) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const handleConfirmLocation = () => {
    console.log("Returning to EditIntention with:", { 
      selectedLocation, 
      medicationName: route.params?.medicationName, 
      dosage: route.params?.dosage, 
      brand: route.params?.brand, 
      frequency: route.params?.frequency, 
      reminders: route.params?.reminders 
    });
  
    navigation.navigate('EditIntention', {
      selectedLocation: {
        place: 'Selected Location',
        coordinates: selectedLocation,
      },
      medicationName: route.params?.medicationName || 'Unknown Medication', // Ensure it’s passed back
      dosage: route.params?.dosage || '',
      brand: route.params?.brand || '',
      frequency: route.params?.frequency || '',
      reminders: route.params?.reminders || [],
    });
  };
  
  
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleSelectLocation}
        >
          {selectedLocation && <Marker coordinate={selectedLocation} />}
        </MapView>
      )}

      <TouchableOpacity
        onPress={handleConfirmLocation}
        style={{
          backgroundColor: 'blue',
          padding: 15,
          position: 'absolute',
          bottom: 50,
          alignSelf: 'center',
          borderRadius: 10,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
}
