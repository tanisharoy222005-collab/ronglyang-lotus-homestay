/* =========================
   SIMPLE ADMIN LOGIN
========================= */

const loginForm =
document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener(
"submit",
function(e){

e.preventDefault();

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

if(
email === "admin@ronglyanglotus.com" &&
password === "admin123"
){

localStorage.setItem(
"adminLoggedIn",
"true"
);

window.location.href =
"dashboard.html";

}
else{

const error =
document.getElementById("loginError");

error.innerText =
"Invalid email or password";

}

});
}

/* =========================
   PAGE PROTECTION
========================= */

const currentPage =
window.location.pathname;

const protectedPages = [

"dashboard.html",
"rooms.html",
"bookings.html",
"offers.html"

];

const isProtectedPage =
protectedPages.some(page =>
currentPage.includes(page)
);

if(isProtectedPage){

const loggedIn =
localStorage.getItem(
"adminLoggedIn"
);

if(loggedIn !== "true"){

window.location.href =
"login.html";

}

}

/* =========================
   LOGOUT FUNCTION
========================= */

function logout(){

localStorage.removeItem(
"adminLoggedIn"
);

window.location.href =
"login.html";

}

/* =========================
   LOAD BOOKINGS
========================= */

function loadBookings(){

const bookingData =
JSON.parse(
localStorage.getItem("booking")
);

const bookingTable =
document.getElementById(
"bookingTable"
);

if(
bookingData &&
bookingTable
){

bookingTable.innerHTML += `

<tr>

<td>${bookingData.name}</td>

<td>${bookingData.email}</td>

<td>${bookingData.phone}</td>

<td>${bookingData.room}</td>

<td>${bookingData.checkin}</td>

<td>${bookingData.checkout}</td>

</tr>

`;

}

}

loadBookings();

/* =========================
   LOAD DASHBOARD STATS
========================= */

function loadDashboardStats(){

const totalRooms =
document.getElementById(
"totalRooms"
);

const totalBookings =
document.getElementById(
"totalBookings"
);

const totalOffers =
document.getElementById(
"totalOffers"
);

if(totalRooms){

totalRooms.innerText = "3";

}

if(totalBookings){

const booking =
localStorage.getItem(
"booking"
);

totalBookings.innerText =
booking ? "1" : "0";

}

if(totalOffers){

totalOffers.innerText = "2";

}

}

loadDashboardStats();

/* =========================
   SAVE OFFERS
========================= */

const offerForm =
document.getElementById(
"offerForm"
);

if(offerForm){

offerForm.addEventListener(
"submit",
function(e){

e.preventDefault();

const title =
document.getElementById(
"offerTitle"
).value;

const description =
document.getElementById(
"offerDescription"
).value;

const offer = {

title,
description

};

localStorage.setItem(
"hotelOffer",
JSON.stringify(offer)
);

alert(
"Offer Saved Successfully"
);

offerForm.reset();

});
}

/* =========================
   LOAD OFFERS
========================= */

function loadOffer(){

const offer =
JSON.parse(
localStorage.getItem(
"hotelOffer"
)
);

const offerContainer =
document.getElementById(
"offerContainer"
);

if(
offer &&
offerContainer
){

offerContainer.innerHTML = `

<div class="card">

<h3>${offer.title}</h3>

<p>${offer.description}</p>

</div>

`;

}

}

loadOffer();
