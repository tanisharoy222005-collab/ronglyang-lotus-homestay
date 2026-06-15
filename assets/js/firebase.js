// Firebase v8 Compatible SDK

const firebaseConfig = {
  apiKey: "AIzaSyDserpkqMBPZphgFTAspUhFTnGe-nNdHZQ",
  authDomain: "ronglyang-lotus-homestay.firebaseapp.com",
  databaseURL: "https://ronglyang-lotus-homestay-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ronglyang-lotus-homestay",
  storageBucket: "ronglyang-lotus-homestay.firebasestorage.app",
  messagingSenderId: "239906245408",
  appId: "1:239906245408:web:494879e15c2861835ca545",
  measurementId: "G-NCXR7Y7WP7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Realtime Database Reference
const db = firebase.database();
