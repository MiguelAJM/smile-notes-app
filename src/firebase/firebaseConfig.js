// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDLak7wXcv74UhFdgOPptgh3T04nTZyB64',
  authDomain: 'smile-notes.firebaseapp.com',
  projectId: 'smile-notes',
  storageBucket: 'smile-notes.appspot.com',
  messagingSenderId: '706657334795',
  appId: '1:706657334795:web:e82b8afa35135e3673390e',
  measurementId: 'G-ZBRXJLM8D9'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
