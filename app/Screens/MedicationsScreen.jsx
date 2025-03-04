import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const medications = [
  { id: 1, name: "Medication 1", description: "Implementation Intention + dosage and cadence" },
  { id: 2, name: "Medication 2", description: "Implementation Intention + dosage and cadence" },
  { id: 3, name: "Medication 3", description: "Implementation Intention + dosage and cadence" },
  { id: 4, name: "Medication 4", description: "Implementation Intention + dosage and cadence" },
];

const MedicationsScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-gray-900 p-4">
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text className="text-white text-2xl font-bold mb-4">Your Medications</Text>
      
      {/* Medications List */}
      <ScrollView className="space-y-4">
        {medications.map((med) => (
          <View key={med.id} className="flex-row items-center bg-gray-800 p-4 rounded-lg">
            <Ionicons name="information-circle-outline" size={24} color="#FF6B6B" className="mr-4" />
            <View className="flex-1">
              <Text className="text-white font-semibold text-lg">{med.name}</Text>
              <Text className="text-gray-400 text-sm">{med.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      
      {/* Floating Add Button */}
      <TouchableOpacity className="absolute bottom-16 right-4 bg-teal-400 p-4 rounded-full shadow-lg">
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
      
      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white flex-row justify-around py-2 border-t border-gray-300">
        <TouchableOpacity>
          <Ionicons name="home" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="checkmark-circle" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="medkit" size={24} color="#FF6B6B" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="settings" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MedicationsScreen;
