import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCeQ_EdbFBZQhGxzJkEZxSlLF6sgmq2cOA",
  authDomain: "spydrain-demo.firebaseapp.com",
  projectId: "spydrain-demo",
  storageBucket: "spydrain-demo.appspot.com",
  messagingSenderId: "918406468181",
  appId: "1:918406468181:web:d6b2cd8a4bf89217823adc"
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();