// ====================================
// BOOKING FORM
// ====================================

const bookingForm =
document.getElementById("bookingForm");

if(bookingForm){

bookingForm.addEventListener(
"submit",
function(e){

e.preventDefault();

const bookingData = {

name:
document.getElementById("name").value,

email:
document.getElementById("email").value,

phone:
document.getElementById("phone").value,

room:
document.getElementById("room").value,

checkin:
document.getElementById("checkin").value,

checkout:
document.getElementById("checkout").value,

createdAt:
new Date().toISOString()

};

// Create unique booking record

const bookingRef =
db.ref("bookings").push();

bookingRef
.set(bookingData)
.then(()=>{

window.location.href =
"booking-success.html";

})
.catch((error)=>{

console.error(error);

alert(
"Booking failed. Please try again."
);

});

});

}
