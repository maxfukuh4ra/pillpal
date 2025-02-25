import React from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Import NavigationContainer
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './IntroScreens/LoginScreen';
import QuestionScreen from './IntroScreens/QuestionScreen';
import ForgotPasswordScreen from './IntroScreens/ForgotScreen';
import Dashboard from './Dashboard/Dashboard';
import EditIntentionScreen from './Intentions/EditIntentionScreen';

// Create the stack navigator
const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuestionScreen"
          component={QuestionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="EditIntention" 
          component={ EditIntentionScreen } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}