// ====================================
// BOOKING FORM + FIREBASE SAVE
// ====================================

document.addEventListener("DOMContentLoaded", () => {

const bookingForm =
document.getElementById("bookingForm");

if (!bookingForm) return;

bookingForm.addEventListener(
"submit",
function(e){

e.preventDefault();

const bookingData = {

name:
document.getElementById("name")?.value || "",

email:
document.getElementById("email")?.value || "",

phone:
document.getElementById("phone")?.value || "",

room:
document.getElementById("room")?.value || "",

checkin:
document.getElementById("checkin")?.value || "",

checkout:
document.getElementById("checkout")?.value || "",

createdAt:
new Date().toISOString()

};

db.ref("bookings")
.push(bookingData)

.then(() => {

alert(
"Booking submitted successfully!"
);

window.location.href =
"booking-success.html";

})

.catch((error) => {

console.error(error);

alert(
"Failed to save booking."
);

});

});

});
