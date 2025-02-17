import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styling/BottomNavBarStyle';

export default function BottomNavBar() {
  const navigation = useNavigation();
  const route = useRoute();

  const navItems = [
    { name: 'Dashboard', icon: 'home' },
    { name: 'Progress', icon: 'check-circle-outline' },
    { name: 'Medications', icon: 'clipboard-list' },
    { name: 'Settings', icon: 'cog-outline' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        {navItems.map((item, index) => {
          const isActive = route.name === item.name;
          return (
            <TouchableOpacity 
              key={index} 
              onPress={() => navigation.navigate(item.name)} 
              style={styles.navButton}
            >
              <MaterialCommunityIcons 
                name={item.icon} 
                size={26} 
                color={isActive ? '#E5989B' : '#D3A7A1'} 
              />
              <Text style={[styles.navText, isActive && styles.activeNavText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
