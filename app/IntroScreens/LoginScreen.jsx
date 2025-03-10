// handles login screen
import React, { useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native'
import LoginStyles from '../styling/LoginStyles'
import { FIREBASE_AUTH } from '../../firebaseconfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = FIREBASE_AUTH

  // go to questions after login
  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        username,
        password
      )
      console.log(response)
      navigation.navigate('Dashboard')
    } catch (error) {
      console.log(error)
      alert(
        'Incorrect email or password. Try again: ' + error.code + error.message
      )
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAccount = () => {
    navigation.navigate('QuestionScreen')
  }

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword')
  }

  return (
    <View style={LoginStyles.container}>
      <Image
        source={require('../../assets/images/pill.png')} 
        style={LoginStyles.image}
      />
      <Text style={LoginStyles.header}>
        Hello and welcome to PillPal, Let's get acquainted
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <>
          <TextInput
            style={LoginStyles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
          <TextInput
            style={LoginStyles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
          <View style={LoginStyles.forgotPasswordContainer}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={LoginStyles.forgotPasswordText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[LoginStyles.button, LoginStyles.button]}
            onPress={handleLogin}
          >
            <Text style={LoginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreateAccount}>
            <Text style={LoginStyles.linkText}>Create Account</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}
