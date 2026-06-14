// ====================================
// FIREBASE CONFIGURATION
// ====================================

// Replace with your Firebase project config

const firebaseConfig = {

  apiKey: "YOUR_API_KEY",

  authDomain: "YOUR_PROJECT.firebaseapp.com",

  projectId: "YOUR_PROJECT_ID",

  storageBucket: "YOUR_PROJECT.appspot.com",

  messagingSenderId: "123456789",

  appId: "YOUR_APP_ID"

};

// ====================================
// INITIALIZE FIREBASE
// ====================================

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// ====================================
// SAVE BOOKING
// ====================================

async function saveBooking(bookingData) {

  try {

    await db.collection("bookings").add({

      name: bookingData.name,

      email: bookingData.email,

      phone: bookingData.phone,

      room: bookingData.room,

      checkin: bookingData.checkin,

      checkout: bookingData.checkout,

      createdAt: new Date()

    });

    console.log("Booking Saved");

    return true;

  } catch (error) {

    console.error(error);

    return false;

  }

}

// ====================================
// GET BOOKINGS
// ====================================

async function getBookings() {

  try {

    const snapshot =
      await db.collection("bookings").get();

    const bookings = [];

    snapshot.forEach((doc) => {

      bookings.push({

        id: doc.id,

        ...doc.data()

      });

    });

    return bookings;

  }

  catch(error){

    console.error(error);

    return [];

  }

}

// ====================================
// SAVE OFFER
// ====================================

async function saveOffer(title, description){

  try{

    await db.collection("offers").add({

      title,

      description,

      createdAt:new Date()

    });

  }

  catch(error){

    console.error(error);

  }

}

// ====================================
// GET OFFERS
// ====================================

async function getOffers(){

  try{

    const snapshot =
      await db.collection("offers").get();

    const offers=[];

    snapshot.forEach((doc)=>{

      offers.push({

        id:doc.id,

        ...doc.data()

      });

    });

    return offers;

  }

  catch(error){

    console.error(error);

    return [];

  }

}
