import { collection, addDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseconfig'

// function to submit user data
export const submitUserData = async (userData) => {
  try {
    const docRef = await addDoc(collection(FIREBASE_DB, 'users'), userData)
    console.log('Document written with ID: ', docRef.id)
  } catch (error) {
    console.error('Error adding document: ', error)
  }
}
