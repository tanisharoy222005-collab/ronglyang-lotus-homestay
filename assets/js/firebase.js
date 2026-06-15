// Firebase Configuration

const firebaseConfig = {
  apiKey: "AIzaSyDGdaL6fUi5P4DZHx8ZPq3L1jnTc5wOJ7I",
  authDomain: "ronglyang-lotus-homestay-23a4b.firebaseapp.com",
  databaseURL: "https://ronglyang-lotus-homestay-23a4b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ronglyang-lotus-homestay-23a4b",
  storageBucket: "ronglyang-lotus-homestay-23a4b.firebasestorage.app",
  messagingSenderId: "765383761315",
  appId: "1:765383761315:web:13efe9fa1dc18a02d58e16",
  measurementId: "G-3K06GDLXTW"
};

// Initialize Firebase only once

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}

// Realtime Database Reference
//uses the already saved tablei if required

window.db = firebase.database();

console.log("Firebase Connected Successfully");
