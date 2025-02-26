import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

export default function EditIntentionScreen({ route }) {
  const navigation = useNavigation()
  const [startTime, setStartTime] = useState('5:30PM')
  const [endTime, setEndTime] = useState('6:30PM')
  const [distance, setDistance] = useState('50')
  const [location, setLocation] = useState('Kitchen')
  const [timeReminderEnabled, setTimeReminderEnabled] = useState(false)
  const [locationReminderEnabled, setLocationReminderEnabled] = useState(false)

  const handleSave = () => {
    // Logic to save changes and pass back to the previous screen
    console.log('Updated Intention:', {
      startTime,
      endTime,
      distance,
      location,
      timeReminderEnabled,
      locationReminderEnabled
    })
    navigation.goBack()
  }

  return (
    <View className="flex-1 bg-[#3c324a] p-5">
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text className="text-white text-2xl font-bold mb-4">Add Intention</Text>
      <Text className="text-pink-200 italic mb-4">
        After coming home from work in the evening
      </Text>

      {/* Medication Information */}
      <View className="flex-row items-center mb-4">
        <Ionicons name="medkit" size={24} color="yellow" />
        <View className="ml-3">
          <Text className="text-white font-bold">Omega 3</Text>
          <Text className="text-pink-200 text-sm">1 tablet after meals</Text>
          <Text className="text-green-400 text-sm">7 days left</Text>
        </View>
      </View>

      {/* Reminder Settings */}
      <Text className="text-white font-bold mb-2">Remind Me:</Text>
      <View className="flex-row items-center mb-4">
        <Text className="text-white mr-2">Between</Text>
        <TextInput
          value={startTime}
          onChangeText={setStartTime}
          className="bg-white px-3 py-1 rounded-md w-20"
        />
        <Text className="text-white mx-2">and</Text>
        <TextInput
          value={endTime}
          onChangeText={setEndTime}
          className="bg-white px-3 py-1 rounded-md w-20"
        />
        <Switch
          value={timeReminderEnabled}
          onValueChange={setTimeReminderEnabled}
          className="ml-2"
        />
      </View>

      <View className="flex-row items-center mb-6">
        <Text className="text-white mr-2">Within</Text>
        <TextInput
          value={distance}
          onChangeText={setDistance}
          className="bg-white px-3 py-1 rounded-md w-16"
        />
        <Text className="text-white mx-2">ft of</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          className="bg-white px-3 py-1 rounded-md w-24"
        />
        <Switch
          value={locationReminderEnabled}
          onValueChange={setLocationReminderEnabled}
          className="ml-2"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        className="bg-white rounded-2xl py-3 items-center"
      >
        <Text className="text-black font-bold">Set Intention</Text>
      </TouchableOpacity>
    </View>
  )
}
