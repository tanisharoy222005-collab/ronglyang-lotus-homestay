const bookingForm =
document.getElementById("bookingForm");

if (bookingForm) {

bookingForm.addEventListener(
"submit",
function(e){

e.preventDefault();

const booking = {

name:
document.getElementById("name").value,

email:
document.getElementById("email").value,

phone:
document.getElementById("phone").value,

checkin:
document.getElementById("checkin").value,

checkout:
document.getElementById("checkout").value,

room:
document.getElementById("room").value

};

localStorage.setItem(
"booking",
JSON.stringify(booking)
);

window.location.href =
"booking-success.html";

});
}
