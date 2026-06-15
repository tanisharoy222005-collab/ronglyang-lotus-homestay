// ====================================
// LOGIN SYSTEM
// ====================================

document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("loginForm");

if(form){

const savedEmail =
localStorage.getItem("adminEmail");

const savedPassword =
localStorage.getItem("adminPassword");

const modeText =
document.getElementById("modeText");

const submitBtn =
document.getElementById("submitBtn");

if(!savedEmail || !savedPassword){

modeText.textContent =
"Create your admin account";

submitBtn.textContent =
"Create Account";

}else{

modeText.textContent =
"Login with your admin account";

submitBtn.textContent =
"Login";

}

form.addEventListener("submit",(e)=>{

e.preventDefault();

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

if(!savedEmail || !savedPassword){

localStorage.setItem(
"adminEmail",
email
);

localStorage.setItem(
"adminPassword",
password
);

localStorage.setItem(
"adminLoggedIn",
"true"
);

window.location.href =
"dashboard.html";

return;

}

if(
email === savedEmail &&
password === savedPassword
){

localStorage.setItem(
"adminLoggedIn",
"true"
);

window.location.href =
"dashboard.html";

}else{

document.getElementById(
"loginError"
).innerText =
"Invalid credentials";

}

});

}

// Dashboard counts
loadDashboard();

// Rooms
loadRooms();

// Offers
loadOffers();

});

// ====================================
// LOGOUT
// ====================================

function logout(){

localStorage.removeItem(
"adminLoggedIn"
);

window.location.href =
"login.html";

}

// ====================================
// DASHBOARD
// ====================================

function loadDashboard(){

const roomsEl =
document.getElementById("totalRooms");

const bookingsEl =
document.getElementById("totalBookings");

const offersEl =
document.getElementById("totalOffers");

if(roomsEl){

db.ref("rooms").once("value")
.then(snapshot=>{

roomsEl.innerText =
snapshot.numChildren();

});

}

if(bookingsEl){

db.ref("bookings").once("value")
.then(snapshot=>{

bookingsEl.innerText =
snapshot.numChildren();

});

}

if(offersEl){

db.ref("offers").once("value")
.then(snapshot=>{

offersEl.innerText =
snapshot.numChildren();

});

}

}

// ====================================
// ROOMS
// ====================================

function loadRooms(){

if(!document.getElementById(
"room1Price"
)) return;

db.ref("rooms").once("value")
.then(snapshot=>{

const rooms =
snapshot.val();

if(!rooms) return;

document.getElementById(
"room1Price"
).value =
rooms.room1.price;

document.getElementById(
"room2Price"
).value =
rooms.room2.price;

document.getElementById(
"room3Price"
).value =
rooms.room3.price;

document.getElementById(
"room4Price"
).value =
rooms.room4.price;

});

}

function saveRooms(){

db.ref("rooms/room1").update({

price:Number(
document.getElementById(
"room1Price"
).value
)

});

db.ref("rooms/room2").update({

price:Number(
document.getElementById(
"room2Price"
).value
)

});

db.ref("rooms/room3").update({

price:Number(
document.getElementById(
"room3Price"
).value
)

});

db.ref("rooms/room4").update({

price:Number(
document.getElementById(
"room4Price"
).value
)

});

alert(
"Room prices updated successfully"
);

}

// ====================================
// OFFERS
// ====================================

function addOffer(){

const title =
document.getElementById(
"offerTitle"
).value;

const description =
document.getElementById(
"offerDescription"
).value;

if(!title) return;

const newOffer =
db.ref("offers").push();

newOffer.set({

title,
description,
createdAt:
new Date().toISOString()

});

alert(
"Offer added"
);

loadOffers();

}

function loadOffers(){

const offersList =
document.getElementById(
"offersList"
);

if(!offersList) return;

db.ref("offers")
.once("value")
.then(snapshot=>{

const data =
snapshot.val();

if(!data){

offersList.innerHTML =
"<p>No offers available</p>";

return;

}

let html = "";

Object.keys(data)
.forEach(key=>{

html += `

<div class="card">
<h4>${data[key].title}</h4>
<p>${data[key].description}</p>
</div>
`;

});

offersList.innerHTML =
html;

});

}
