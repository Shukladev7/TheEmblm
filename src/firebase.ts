// Firebase setup
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKJrr72jeR43OVsoDDCmA3IiT8h74M_7k",
  authDomain: "theemblm.firebaseapp.com",
  projectId: "theemblm",
  storageBucket: "theemblm.firebasestorage.app",
  messagingSenderId: "778233310429",
  appId: "1:778233310429:web:f721cd79e30e7933377f34",
  measurementId: "G-VHWVFW8T2D"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
